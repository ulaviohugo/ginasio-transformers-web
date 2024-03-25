import { useAthletes } from "@/presentation/hooks";
import { NumberUtils } from "@/utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IconClose, IconEmail, IconHeight, IconHome, IconInfo, IconPhone, IconUser, IconWeight } from "../icons";
import { Logo } from "../layout";
import { AthleteModel } from "@/domain/models";
import { IconIMC } from "../layout/iconIMC";
import { ResultadoIMC } from "../layout/resultadoIMC";
import { Normal } from "../layout/normal";
import { ObesidadeGrau1 } from "../layout/obesidadeGrau1";
import { ObesidadeGrau2 } from "../layout/obesidadeGrau2";
import { ObesidadeGrau3 } from "../layout/obesidadeGrau3";
import { Sobrepeso } from "../layout/sobrepeso";
import { AbaixoDoNormal } from "../layout/abaixoDoNormal";

type HandleOpenCardIMCProps = {
  show: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  icon?: React.ReactNode;
};

export function HandleOpenCardIMC ({ show, onClose, size = 'xl', icon }: HandleOpenCardIMCProps) {
  const athletes = useSelector(useAthletes());
  const [open, setOpen] = useState(show);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [showNormal, setShowNormal] = useState(false);
  const [showAbaixoDoNormal, setShowAbaixoDoNormal] = useState(false);
  const [showSobrepeso, setShowSobrepeso] = useState(false);
  const [showObesidadeGrau1, setShowObesidadeGrau1] = useState(false);
  const [showObesidadeGrau2, setShowObesidadeGrau2] = useState(false);
  const [showObesidadeGrau3, setShowObesidadeGrau3] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
  };

  const handleClearInputs = () => {
    setInput1("");
    setInput2("");
    setInput3("");
    setShowNormal(false);
    setShowAbaixoDoNormal(false);
    setShowSobrepeso(false);
    setShowObesidadeGrau1(false);
    setShowObesidadeGrau2(false);
    setShowObesidadeGrau3(false);
  };

  const handleCalculate = () => {
    const value1 = parseFloat(input1);
    const value2 = parseFloat(input2.replace(',', '.')); // Substitui vírgulas por pontos
    if (!isNaN(value1) && !isNaN(value2)) {
      const result = value1 / Math.pow(value2, 2);
      setInput3(result.toFixed(2));
      setShowNormal(result >= 18.6 && result <= 24.9);
      setShowAbaixoDoNormal(result <= 18.5);
      setShowSobrepeso(result >= 25.0 && result <= 29.9);
      setShowObesidadeGrau1(result >= 30.0 && result <= 34.9);
      setShowObesidadeGrau2(result >= 35.0 && result <= 39.9);
      setShowObesidadeGrau3(result > 40.0);
    }
  };

  if (!open) return <></>;

  const w: any = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-1/2 lg:w-5/12"> {/* Aqui ajustamos a largura para 5/12 do layout */}
        <div className={`relative flex flex-col bg-primary p-5 mx-5 rounded-lg w-full ${w[size]}`} style={{ maxHeight: "90vh" }}>
          <button
            className="absolute top-2 right-2 group"
            onClick={handleClose}
            title="Fechar janela"
          >
            <IconClose
              size={24}
              className="group-hover:scale-150 transition-all text-white duration-100 ease-in"
            />
          </button>
          <div className="font-semibold text-white flex items-center gap-2 mb-2"> 
            <span>Calculo de IMC</span>
            <IconWeight />
            <IconIMC />
          </div>
          {showNormal && <Normal />}
          {showAbaixoDoNormal && <AbaixoDoNormal />}
          {showSobrepeso && <Sobrepeso />}
          {showObesidadeGrau1 && <ObesidadeGrau1 />}
          {showObesidadeGrau2 && <ObesidadeGrau2 />}
          {showObesidadeGrau3 && <ObesidadeGrau3 />}
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="number"
              step="0.01"
              placeholder="Peso(kg)"
              pattern="\d+(\.\d{2})?"
              className="text-sm pl-0 pr-0 border-b border-white bg-transparent text-white w-20"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
            <input
              type="text"
              className="text-sm pl-0 pr-0 border-b border-white bg-transparent text-white w-20"
              value={input2}
              placeholder="Altura(m)"
              onChange={(e) => {
                const value = e.target.value;
                // Verifica se o valor começa com um dígito de 1 a 9 e se não contém um ponto
                if (/^[1-9]$/.test(value) && value.indexOf('.') === -1) {
                  setInput2(value + '.'); // Adiciona o ponto automaticamente
                } else {
                  setInput2(value); // Mantém o valor atual
                }
              }}
            />
            <input
              type="text"
              readOnly
              className="text-sm pl-0 pr-0 border-b border-white bg-transparent text-white w-20"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
            />
            <button
              name="calcular"
              className="bg-orange-500 text-white rounded-md px-4 py-2 flex items-center"
              onClick={handleCalculate}
            >
              Calcular
              <IconWeight />
            </button>
            <button
              className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 flex items-center"
              onClick={handleClearInputs}
            >
              <IconClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}