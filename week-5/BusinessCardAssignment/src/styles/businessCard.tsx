interface stylesInterface {
    container: {
        border: string,
        borderRadius: string,
        // color: string
    },
    name: {
        fontSize: string,
        marginBottom: string,
        color: string
    }
}

const styles: stylesInterface = {
    container: {
        border: "1px solid black",
        borderRadius: "8px",
        // color: "white"
    },
    name: {
        fontSize: "24px",
        marginBottom: "10px",
        color: "yellow"
    }
}

export default styles;