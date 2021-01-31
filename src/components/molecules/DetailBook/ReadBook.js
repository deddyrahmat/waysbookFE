import React, { Fragment } from 'react';

import { ReactReader } from "react-reader";

const ReadBook = () => {
    return (
        <Fragment>
            <div style={{ position: "relative", height: "100%" }}>
                {" Lorem "}
                <ReactReader
                url={"../../../assets/files/alice.epub"}
                title={"Alice in wonderland"}
                location={"epubcfi(/6/2[cover]!/6)"}
                locationChanged={epubcifi => console.log(epubcifi)}
                />
            </div>
        </Fragment>
    )
}

export default ReadBook
