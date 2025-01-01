import {Container, Typography} from "@mui/material";
import React from "react";

const Layout: React.FC<{ title: string; children: React.ReactNode }> = ({
                                                                            title,
                                                                            children,
                                                                        }) => (
    <Container maxWidth="sm" style={{padding: "2rem"}}>
        <Typography variant="h4" align="center" gutterBottom>
            {title}
        </Typography>
        {children}
    </Container>
);

export default Layout;