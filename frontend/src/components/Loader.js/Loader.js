import React from "react";
import { useSelector } from "react-redux";

import { TailSpin } from "react-loader-spinner";

const Spin = (props) => {
    const spinner = useSelector(state => {
        return state.loader.loading;
    });

    return (
        <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 100
            }}
            wrapperClass=""
            visible={ spinner }
        />
    );
}

export default Spin;