import React, { useEffect, useState } from 'react';
import { Layout, LayoutBody, Spinner } from '@/presentation/components';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import { MenuUtils } from '@/utils';
import { makeRemoteCountAthletes, makeRemoteCountEmployees } from '@/main/factories/usecases';
import { toast } from 'react-hot-toast';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';
import { IconAthlete, IconUser, IconDumbbell, IconDepartment } from '@/presentation/components/icons';
import { HomeGraph, HomeGraphDataProps } from '../components/home-graph';
import { NotFound } from './notfound';

type ItemProps = {
  number: number;
  title: string;
  icon?: React.ElementType;
  isLoading?: boolean;
  href: string;
  className?: string;
};

export function Home() {
  const user = useSelector(useAuth());
  const isAdmin = user?.role === 'Admin';
  const isAdminGlobal = null; // Set dynamically as per your requirement

  const [graphData, setGraphData] = useState<HomeGraphDataProps>({ monthly_fees: [] });
  const [employees, setEmployees] = useState(0);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [athletes, setAthletes] = useState(0);
  const [equipments, setEquipments] = useState(0);
  const [gyms, setGyms] = useState(0);
  const [isLoadingAthletes, setIsLoadingAthletes] = useState(true);
  const [isLoadingEquipments, setIsLoadingEquipments] = useState(true);
  const [isLoadingGyms, setIsLoadingGyms] = useState(true);

  const fetchCount = (
    remoteResource: { count: () => Promise<number> },
    callback: (response: any) => void
  ) => {
    remoteResource
      .count()
      .then((response) => {
        callback(response);
      })
      .catch(({ message }) => {
        callback(0);
        toast.error(message);
      });
  };

  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        fetchCount(makeRemoteCountEmployees(), (response) => {
          setEmployees(response);
          setIsLoadingEmployees(false);
        }),
        fetchCount(makeRemoteCountAthletes(), (response) => {
          setAthletes(response);
          setIsLoadingAthletes(false);
        }),
        makeAuthorizeHttpClientDecorator()
          .request({
            url: makeApiUrl('/materiais/count'),
            method: 'get',
          })
          .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
              setEquipments(response.body);
              setIsLoadingEquipments(false);
            } else {
              toast.error(response.body);
            }
          }),
        makeAuthorizeHttpClientDecorator()
          .request({
            url: makeApiUrl('/gyms/count'),
            method: 'get',
          })
          .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
              setGyms(response.body);
              setIsLoadingGyms(false);
            } else {
              toast.error(response.body);
            }
          }),
      ]);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        makeAuthorizeHttpClientDecorator()
          .request({
            url: makeApiUrl('/graphs/monthly-fees'),
            method: 'post',
            body: { year: 2024 },
          })
          .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
              setGraphData(response.body);
            } else {
              toast.error(response.body);
            }
          }),
      ]);
    }
  }, [isAdmin]);

  if (!isAdmin) return <NotFound />;

  const items = [
    { number: employees, title: 'Funcionário(s)', icon: IconUser, isLoading: isLoadingEmployees, href: MenuUtils.FRONT.EMPLOYEES },
    { number: athletes, title: 'Atletas(s)', icon: IconAthlete, isLoading: isLoadingAthletes, href: MenuUtils.FRONT.ATHLETES },
    { number: equipments, title: 'Equipamento(s)', icon: IconDumbbell, isLoading: isLoadingEquipments, href: MenuUtils.FRONT.EQUIPMENTS },
    { number: gyms, title: 'Filial(s)', icon: IconDepartment, isLoading: isLoadingGyms, href: MenuUtils.FRONT.GYMS },
  ].filter(({ href }) => {
    if (href === MenuUtils.FRONT.GYMS) {
      return isAdminGlobal == user.gym_id;
    }
    return true;
  });

  return (
    <Layout>
      <LayoutBody>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
          {isAdmin && (
            <>
              {items.map((item, index) => (
                <Item
                  key={index}
                  index={index}
                  {...item}
                />
              ))}
            </>
          )}
        </div>
        <HomeGraph data={graphData} />
      </LayoutBody>
    </Layout>
  );
}

const Item = ({ icon: Icon, number, title, isLoading, href, className, index }: ItemProps & { index: number }) => {
  // Define a cor de fundo e a opacidade com base no índice
  const backgroundColor = (index === 1 || index === 3) ? 'bg-blue-900 bg-opacity-100' : ''; // Define a cor de fundo e a opacidade apenas para o segundo e quarto item
  const textColor = (index === 1 || index === 3) ? 'text-white' : ''; // Define a cor do texto apenas para o segundo e quarto item

  return (
    <Link
      to={href}
      className={`flex gap-2 shadow-md p-4 rounded-lg hover:scale-105 transition-all duration-300 ${backgroundColor} ${className || ''}`}
    >
      {Icon && <Icon className={`text-7xl ${textColor}`} />}
      <div className={`flex-1 ${textColor}`}>
        <h2>{title}</h2>
        <div className="text-5xl font-bold">
          {isLoading ? <Spinner className="text-base" /> : number}
        </div>
      </div>
    </Link>
  );
};

export default Home;
