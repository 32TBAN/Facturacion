import React, { useEffect } from 'react'

export const Alert = ({message}) => {
  const [show, setShow] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
        setShow(true);
        }
  }, []);
    return (
        <div className={`alert alert-warning ${show ? 'show' : 'hide'}`} role="alert">
            {message}
        </div>
    )
}
