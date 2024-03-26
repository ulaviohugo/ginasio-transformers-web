import React from 'react'
import { IconBaseProps } from 'react-icons'
import {
	HiBriefcase,
	HiHome,
	HiKey,
	HiMail,
	HiPhone,
	HiPlus,
	HiUser,
	HiTrash,
	HiPencilAlt,
	HiOutlineCurrencyDollar,
	HiMinus,
	HiOutlineIdentification,
	HiInformationCircle  
} from 'react-icons/hi'
import { IoMdPeople } from "react-icons/io";
import {
	AiOutlineClockCircle,
	AiOutlineShoppingCart,
	AiOutlineCheckCircle
} from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'
import { MdPlayLesson ,MdOutlineMonetizationOn } from 'react-icons/md'
import { GrStorage } from 'react-icons/gr'
import { IoMdClose, IoMdNotificationsOutline } from 'react-icons/io'
import { BiSearch, BiCategoryAlt, BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { FaHouseUser, FaSignOutAlt,FaDumbbell  ,FaUserShield, FaCashRegister, FaUserTie } from 'react-icons/fa'
import { PiUserListThin } from 'react-icons/pi'
import { FaFilePdf,FaHotel } from 'react-icons/fa6'
import { GiMuscleUp,GiBodyHeight,GiWeight } from 'react-icons/gi'

export const IconService = (props: IconBaseProps): React.ReactElement => (
	<HiBriefcase {...props} />
)
export const IconLesson = (props: IconBaseProps): React.ReactElement => (
	<MdPlayLesson {...props} />
)
export const IconAdmin = (props: IconBaseProps): React.ReactElement => (
	<FaUserTie {...props} />
)
export const IconInfo = (props: IconBaseProps): React.ReactElement => (
	<HiInformationCircle {...props} />
)
export const IconHeight = (props: IconBaseProps): React.ReactElement => (
	<GiBodyHeight {...props} />
)
export const IconWeight = (props: IconBaseProps): React.ReactElement => (
	<GiWeight {...props} />
)
export const IconDepartment = (props: IconBaseProps): React.ReactElement => (
	<FaHotel {...props} />
)
export const IconSupliers = (props: IconBaseProps): React.ReactElement => (
	<IoMdPeople {...props} />
)
export const IconDumbbell = (props: IconBaseProps): React.ReactElement => (
	<FaDumbbell {...props} />
)
export const IconCategory = (props: IconBaseProps): React.ReactElement => (
	<BiCategoryAlt {...props} />
)
export const IconChevronLeft = (props: IconBaseProps): React.ReactElement => (
	<BiChevronLeft {...props} />
)
export const IconChevronRight = (props: IconBaseProps): React.ReactElement => (
	<BiChevronRight {...props} />
)
export const IconCurrency = (props: IconBaseProps): React.ReactElement => (
	<HiOutlineCurrencyDollar {...props} />
)
export const IconCheck = (props: IconBaseProps): React.ReactElement => (
	<AiOutlineCheckCircle {...props} />
)
export const IconClock = (props: IconBaseProps): React.ReactElement => (
	<AiOutlineClockCircle {...props} />
)
export const IconCustomer = (props: IconBaseProps): React.ReactElement => (
	<PiUserListThin {...props} />
)
export const IconSupplier = (props: IconBaseProps): React.ReactElement => (
	<FaHouseUser {...props} />
)
export const IconInsured = (props: IconBaseProps): React.ReactElement => (
	<FaUserShield {...props} />
)
export const IconPDF = (props: IconBaseProps): React.ReactElement => (
	<FaFilePdf {...props} />
)

export const IconKey = (props: IconBaseProps): React.ReactElement => <HiKey {...props} />
export const IconEmail = (props: IconBaseProps): React.ReactElement => (
	<HiMail {...props} />
)
export const IconHome = (props: IconBaseProps): React.ReactElement => (
	<HiHome {...props} />
)

export const IconPhone = (props: IconBaseProps): React.ReactElement => (
	<HiPhone {...props} />
)
export const IconPlus = (props: IconBaseProps): React.ReactElement => (
	<HiPlus {...props} />
)
export const IconMinus = (props: IconBaseProps): React.ReactElement => (
	<HiMinus {...props} />
)
export const IconProduct = (props: IconBaseProps): React.ReactElement => (
	<AiOutlineShoppingCart {...props} />
)
export const IconSpinner = (props: IconBaseProps): React.ReactElement => (
	<ImSpinner2 {...props} />
)
export const IconCashRegister = (props: IconBaseProps): React.ReactElement => (
	<FaCashRegister {...props} />
)
export const IconSignout = (props: IconBaseProps): React.ReactElement => (
	<FaSignOutAlt {...props} />
)
export const IconUser = (props: IconBaseProps): React.ReactElement => (
	<HiUser {...props} />
)
export const IconAthlete = (props: IconBaseProps): React.ReactElement => (
	<GiMuscleUp {...props} />
)
export const IconSearch = (props: IconBaseProps): React.ReactElement => (
	<BiSearch {...props} />
)
export const IconBudget = (props: IconBaseProps): React.ReactElement => (
	<MdOutlineMonetizationOn {...props} />
)

export const IconEdit = (props: IconBaseProps) => <HiPencilAlt {...props} />
export const IconTrash = (props: IconBaseProps) => <HiTrash {...props} />
export const IconClose = (props: IconBaseProps) => <IoMdClose {...props} />
export const Iconcard = (props: IconBaseProps) => <HiOutlineIdentification {...props} />

export const IconStock = (props: IconBaseProps) => <GrStorage {...props} />
export const IconNotification = (props: IconBaseProps) => (
	<IoMdNotificationsOutline {...props} />
)
