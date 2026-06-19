function Header() {

    const style = {

        fontSize: "40px",
        letterSpacing: "-1.68px",
        margin: "20px 0",
        width: "10",
        textAlign: "center",
        font: "40px Verdana, Arial, sans-serif",
    };

    return (
        <div>
            <h1 style={style}>
                Job Application Tracker
            </h1>
        </div>
    )
}

export default Header;