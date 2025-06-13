import { Box, Grid, Pagination, PaginationItem, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';

export const AsistentesPaginationTable = () => {
    const [page, setPage] = useState<number>(0);
    const { assistantsTable, setAssistantsTableAction } = useContext(AdminContext);

    useEffect(() => {
        setAssistantsTableAction({ ...assistantsTable, tablePage: page })
    }, [page])


    const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={2} columns={12} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                    <Grid size={6} sx={{ paddingLeft: '15px' }}>
                        <Typography sx={{ paddingTop: '5px' }}>{assistantsTable.totalRows} asistentes totales</Typography>
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                            // @ts-expect-error
                            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                            onChange={(e, value) => handleChange(e, value)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AsistentesPaginationTable;