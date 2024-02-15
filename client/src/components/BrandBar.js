import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (

        <Row >

            {device.brands.map(brand =>

                    <Card
                        className=" p-3 "
                        style={{cursor: "pointer",   width: "max-content", height: "min-content", padding: 5}}
                        key={brand.id}
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}

                    >
                        {brand.name}
                    </Card>


            )}

        </Row>

    );
});

export default BrandBar;