

interface DisplayNotificationProps {
 
    errorNotification: string
}

const DisplayNotification = (props: DisplayNotificationProps) => {
    return (
        <div style={{color: 'red'}}>{props.errorNotification}</div>
    )
}

export default DisplayNotification;