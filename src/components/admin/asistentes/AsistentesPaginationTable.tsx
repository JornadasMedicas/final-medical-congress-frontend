import { Box, Grid, Pagination, PaginationItem, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../../../context/AdminContext';

export const AsistentesPaginationTable = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [page, setPage] = useState<number>(0);
    const { assistantsTable, setAssistantsTableAction } = useContext(AdminContext);

    useEffect(() => {
        setAssistantsTableAction(prev => ({ ...prev, tablePage: page  }))
    }, [page, setAssistantsTableAction]);


    const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={2} columns={12} sx={{ flexDirection: { xs: "column", md: "row" }, mt: responsive ? 2 : 0, mb: responsive ? 2 : 0 }}>
                    <Grid size={responsive ? 12 : 6} sx={{ paddingLeft: responsive ? 0 : '15px', textAlign: responsive ? 'center' : 'left' }}>
                        <Typography sx={{ paddingTop: '5px' }}>{assistantsTable.totalRows} asistentes totales</Typography>
                    </Grid>
                    <Grid size={responsive ? 12 : 6} sx={{ display: 'flex', justifyContent: responsive ? 'center' : 'flex-end' }}>
                        <Pagination
                            sx={{
                                "& li .Mui-selected": {
                                    color: "#ffffff",
                                    backgroundColor: "background.default"
                                },
                                "& li .Mui-selected:hover": {
                                    color: "#ffffff",
                                    backgroundColor: "background.default"
                                },
                                width: 'auto'
                            }}
                            variant="outlined"
                            shape="circular"
                            page={page + 1}
                            count={Math.ceil(assistantsTable.totalRows / 10)}
                            renderItem={(props2) => <PaginationItem {...props2}/>}
                            onChange={(e, value) => handleChange(e, value)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AsistentesPaginationTable;