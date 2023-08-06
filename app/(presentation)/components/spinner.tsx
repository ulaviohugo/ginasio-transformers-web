import { IconBaseProps } from 'react-icons'
import { IconSpinner } from './icons'

type SpinnerProps = IconBaseProps & {
	data?: string
}
export function Spinner({ className, data, ...props }: SpinnerProps) {
	return (
		<div className="flex gap-1 items-center">
			<IconSpinner className={`animate-spin ${className ?? ''}`} {...props} />{' '}
			{data || ''}
		</div>
	)
}
