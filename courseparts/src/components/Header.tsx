
interface HeaderProps {
    headerText: string;
}

const Header = (props: HeaderProps) => {
    return (
        <h1>{props.headerText}</h1>
    );
};

export default Header;