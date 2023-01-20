export default function Button({ children, onClick, disabled, className }) {
    return <button disabled={disabled} className={`button ${className ? className : ''}`} type="submit" onClick={onClick}>{children}</button>
}

export function SmallButton({ children, onClick, className }) {
    return <span className={`small ${className ? className : ''}`} onClick={onClick}>{children}</span>
}