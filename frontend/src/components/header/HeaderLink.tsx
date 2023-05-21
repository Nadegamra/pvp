import { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'

interface Props {
    to: string
    onClick?: () => void
    text: string
    children?: ReactNode
    className: string
}

function HeaderLink({ onClick, text, to, children, className }: Props) {
    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })

    return (
        <>
            {isBigScreen ? (
                <Link to={to} className={className} onClick={onClick}>
                    {text}
                    {children}
                </Link>
            ) : (
                <Link
                    to={to}
                    className={className}
                    onClick={() => {
                        if (onClick !== undefined) {
                            onClick()
                        }
                        window.location.href = to
                    }}>
                    {text}
                    {children}
                </Link>
            )}
        </>
    )
}

export default HeaderLink
