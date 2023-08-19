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
	HiOutlineCurrencyDollar
} from 'react-icons/hi'
import {
	AiOutlineClockCircle,
	AiOutlineShoppingCart,
	AiOutlineCheckCircle
} from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'
import { IoMdClose } from 'react-icons/io'
import { BiSearch, BiCategoryAlt } from 'react-icons/bi'
import { FaHouseUser } from 'react-icons/fa'

export const IconService = (props: IconBaseProps): React.ReactElement => (
	<HiBriefcase {...props} />
)
export const IconCategory = (props: IconBaseProps): React.ReactElement => (
	<BiCategoryAlt {...props} />
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
export const IconSupplier = (props: IconBaseProps): React.ReactElement => (
	<FaHouseUser {...props} />
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
export const IconProduct = (props: IconBaseProps): React.ReactElement => (
	<AiOutlineShoppingCart {...props} />
)
export const IconSpinner = (props: IconBaseProps): React.ReactElement => (
	<ImSpinner2 {...props} />
)
export const IconUser = (props: IconBaseProps): React.ReactElement => (
	<HiUser {...props} />
)
export const IconSearch = (props: IconBaseProps): React.ReactElement => (
	<BiSearch {...props} />
)

export const IconEdit = (props: IconBaseProps) => <HiPencilAlt {...props} />
export const IconTrash = (props: IconBaseProps) => <HiTrash {...props} />
export const IconClose = (props: IconBaseProps) => <IoMdClose {...props} />
