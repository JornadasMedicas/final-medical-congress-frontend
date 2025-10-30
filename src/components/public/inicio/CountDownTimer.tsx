import { Box, /* Button */ Grid, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import Countdown from 'react-countdown';
/* import SendIcon from '@mui/icons-material/Send'; */
import { TimerObjectSingleComponent } from './TimerObjectSingleComponent';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import { motion } from 'motion/react';

export const CountDownTimer = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    /* const [disabled, setDisabled] = useState(true)
    const [pointeraction, setPointeraction] = useState('none') */
    const [display] = useState(1)

    /* const countdownAction = () => {
        setDisabled(false);
        setPointeraction('visible');
        setDisplay(2);
    } */

    const registerDay = new Date("November 03, 2025 09:00:00");

    return (
        <>
            <Box sx={{ mt: responsive ? 0 : 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {display === 1 ?
                    <>
                        <Grid
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, ease: 'easeInOut', delay: 0.5 }}
                            viewport={{ once: true }}
                            size={12}
                            sx={{ display: 'flex', justifyContent: 'center', mb: responsive ? 5 : 9, mt: 'auto' }}
                        >
                            <LabelImportantTwoToneIcon sx={{ fontSize: responsive ? 33 : 40, color: 'text.secondary', mr: 1 }} />
                            <Typography
                                fontFamily={'sans-serif'}
                                fontWeight={'bold'}
                                textAlign={'center'}
                                sx={{ fontSize: responsive ? '18px' : '24px', mt: 'auto', mb: 'auto' }}
                                color="background.default"
                            >
                                ¡El REGISTRO SE HABILITARÁ PRONTO!
                            </Typography>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: responsive ? 'center' : 'space-between', flexDirection: 'row', width: responsive ? '100%' : '70%', gap: responsive ? 2 : 0 }}>
                            <Countdown date={registerDay} renderer={({ days }) => (
                                <TimerObjectSingleComponent type={days} title="DÍAS" />
                            )} />
                            <Countdown date={registerDay} renderer={({ hours }) => (
                                <TimerObjectSingleComponent type={hours} title="HORAS" />
                            )} />
                            <Countdown date={registerDay} renderer={({ minutes }) => (
                                <TimerObjectSingleComponent type={minutes} title="MINUTOS" />
                            )} />
                            <Countdown date={registerDay} renderer={({ seconds }) => (
                                <TimerObjectSingleComponent type={seconds} title="SEGUNDOS" />
                            )} />
                        </Box>
                    </>
                    :
                    <>
                        ¡<b style={{ fontSize: '28px', color: '#b7402a' }}>E</b>L REGISTRO ESTÁ DISPONIBLE!
                    </>
                }
            </Box>
        </>
    )
}
