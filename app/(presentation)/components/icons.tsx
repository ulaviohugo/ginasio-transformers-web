import React from 'react'
import { IconBaseProps } from 'react-icons'
import {
	HiBriefcase,
	HiCheckCircle,
	HiHome,
	HiInformationCircle,
	HiKey,
	HiMail,
	HiPhone,
	HiPlus,
	HiUser,
	HiTrash,
	HiPencilAlt
} from 'react-icons/hi'
import { RiExternalLinkLine } from 'react-icons/ri'
import { MdLocationOn } from 'react-icons/md'
import { AiOutlineBuild, AiOutlineClockCircle } from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'

export const IconService = (props: IconBaseProps): React.ReactElement => (
	<HiBriefcase {...props} />
)
export const IconClock = (props: IconBaseProps): React.ReactElement => (
	<AiOutlineClockCircle {...props} />
)
export const IconCheckCircle = (props: IconBaseProps): React.ReactElement => (
	<HiCheckCircle {...props} />
)
export const IconContact = (props: IconBaseProps): React.ReactElement => (
	<HiPhone {...props} />
)
export const IconKey = (props: IconBaseProps): React.ReactElement => <HiKey {...props} />
export const IconEmail = (props: IconBaseProps): React.ReactElement => (
	<HiMail {...props} />
)
export const IconHome = (props: IconBaseProps): React.ReactElement => (
	<HiHome {...props} />
)
export const IconInfo = (props: IconBaseProps): React.ReactElement => (
	<HiInformationCircle {...props} />
)
export const IconLink = (props: IconBaseProps): React.ReactElement => (
	<RiExternalLinkLine {...props} />
)
export const IconLocation = (props: IconBaseProps): React.ReactElement => (
	<MdLocationOn {...props} />
)
export const IconPhone = (props: IconBaseProps): React.ReactElement => (
	<HiPhone {...props} />
)
export const IconPlus = (props: IconBaseProps): React.ReactElement => (
	<HiPlus {...props} />
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
export const IconMenu = (props: IconBaseProps) => <IoIosMenu {...props} />
export const IconClose = (props: IconBaseProps) => <IoMdClose {...props} />
export const IconBuilding = (props: IconBaseProps) => <AiOutlineBuild {...props} />
