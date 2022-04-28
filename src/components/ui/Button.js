import "styles/ui/Button.scss";

export const Button = (props) => (
  <button
    {...props}
    type="button"
    style={{ width: props.width, ...props.style }}
    className={`primary-button ${props.className}`}
  >
    {props.children}
  </button>
);
