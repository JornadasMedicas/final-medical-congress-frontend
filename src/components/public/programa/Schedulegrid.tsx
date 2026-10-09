import { useState } from 'react';
import {
    Box,
    ButtonBase,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

type Tone = 'morning' | 'afternoon';

interface Day {
    id: string;
    label: string;
}

interface Slot {
    id: string;
    label: string;
    time: string;
    tone: Tone;
}

interface Activity {
    dayId: string;
    slotId: string;
    area: string;
    /** Usa \n para forzar el salto de línea del título en la tarjeta */
    title: string;
    description: string;
    venue: string;
    time: string;
}

/* ───────────── Datos ───────────── */

const DAYS: Day[] = [
    { id: 'mie', label: 'Miércoles 25' },
    { id: 'jue', label: 'Jueves 26' },
    { id: 'vie', label: 'Viernes 27' },
];

const SLOTS: Slot[] = [
    { id: 'manana', label: 'Mañana', time: '08:00 — 14:00', tone: 'morning' },
    { id: 'tarde', label: 'Tarde', time: '15:00 — 20:00', tone: 'afternoon' },
];

const ACTIVITIES: Activity[] = [
    {
        dayId: 'mie',
        slotId: 'manana',
        area: 'Medicina',
        title: 'Por Definir',
        description:
            'Casos reales y nuevas técnicas que ya están transformando la consulta diaria.',
        venue: 'Auditorio principal',
        time: '09:00 — 13:00',
    },
    {
        dayId: 'jue',
        slotId: 'manana',
        area: 'Medicina',
        title: 'Por Definir',
        description:
            'Simulaciones de urgencias para entrenar el criterio clínico bajo presión.',
        venue: 'Sala de simulación',
        time: '09:00 — 13:00',
    },
    {
        dayId: 'vie',
        slotId: 'manana',
        area: 'Medicina',
        title: 'Por Definir',
        description:
            'Prevención, medicina personalizada y las tendencias que marcarán la próxima década.',
        venue: 'Auditorio principal',
        time: '09:00 — 13:00',
    },
    {
        dayId: 'mie',
        slotId: 'tarde',
        area: 'Enfermería',
        title: 'Por Definir',
        description:
            'Talleres prácticos sobre cuidado centrado en el paciente y comunicación.',
        venue: 'Aula 2',
        time: '15:00 — 19:00',
    },
    {
        dayId: 'jue',
        slotId: 'tarde',
        area: 'Estomatología',
        title: 'Por Definir',
        description:
            'Estética dental y rehabilitación oral con demostraciones en vivo.',
        venue: 'Clínica odontológica',
        time: '15:00 — 19:00',
    },
    {
        dayId: 'vie',
        slotId: 'tarde',
        area: 'Químicos',
        title: 'Por Definir',
        description:
            'Del laboratorio a la farmacia: cómo se desarrollan y controlan los medicamentos.',
        venue: 'Laboratorio central',
        time: '15:00 — 19:00',
    },
];

/* ───────────── Tokens de color ───────────── */

const COLORS = {
    pageBg: '#F7F5F1',
    border: '#DAD6CC',
    header: '#0F3A30',
    headerLine: 'rgba(255,255,255,0.12)',
    slotBg: '#F4F1EA',
    slotTitle: '#0F3A30',
    slotTime: '#8A8A82',
    accent: '#B5654A',
    note: '#7A7A72',
};

const TONES: Record<
    Tone,
    { bg: string; hover: string; fg: string; divider: string }
> = {
    morning: {
        bg: '#DFE9E2',
        hover: '#D2E0D7',
        fg: '#0F3A30',
        divider: 'rgba(15,58,48,0.14)',
    },
    afternoon: {
        bg: '#F2DFD4',
        hover: '#ECD1C2',
        fg: '#6B3A2D',
        divider: 'rgba(107,58,45,0.16)',
    },
};

const GRID_COLUMNS = '170px repeat(3, minmax(0, 1fr))';

export default function ScheduleGrid() {
    const [selected, setSelected] = useState<Activity | null>(null);
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    const selectedSlot = selected
        ? SLOTS.find((s) => s.id === selected.slotId)
        : undefined;
    const selectedTone = selectedSlot ? TONES[selectedSlot.tone] : TONES.morning;

    return (
        <Box sx={{ p: { xs: 1.5, md: 3 }, mt: responsive ? 0 : 13, mb: responsive ? 4 : 13  }}>
            {/* Scroll horizontal en pantallas pequeñas */}
            <Box sx={{ overflowX: 'auto' }}>
                <Box
                    role="table"
                    aria-label="Horario de actividades"
                    sx={{
                        minWidth: 760,
                        border: `1px solid ${COLORS.border}`,
                        boxShadow: '0 8px 30px rgba(15,58,48,0.06)',
                        bgcolor: COLORS.slotBg,
                    }}
                >
                    {/* Encabezado */}
                    <Box
                        role="row"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: GRID_COLUMNS,
                            bgcolor: COLORS.header,
                            color: '#fff',
                        }}
                    >
                        <Box
                            role="columnheader"
                            sx={{ px: 2.5, py: 2.25, display: 'flex', alignItems: 'flex-start' }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Horario
                            </Typography>
                        </Box>
                        {DAYS.map((day) => (
                            <Box
                                key={day.id}
                                role="columnheader"
                                sx={{
                                    px: 3,
                                    py: 2.25,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.25,
                                    borderLeft: `1px solid ${COLORS.headerLine}`,
                                }}
                            >
                                <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
                                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                                    {day.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Filas */}
                    {SLOTS.map((slot, rowIndex) => {
                        const tone = TONES[slot.tone];
                        return (
                            <Box
                                key={slot.id}
                                role="row"
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: GRID_COLUMNS,
                                    borderTop:
                                        rowIndex > 0 ? `1px solid ${COLORS.border}` : undefined,
                                }}
                            >
                                <Box
                                    role="rowheader"
                                    sx={{
                                        px: 2.5,
                                        py: 3,
                                        bgcolor: COLORS.slotBg,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: 0.75,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: COLORS.slotTitle,
                                        }}
                                    >
                                        {slot.label}
                                    </Typography>
                                    <Typography sx={{ fontSize: 12, color: COLORS.slotTime }}>
                                        {slot.time}
                                    </Typography>
                                </Box>

                                {DAYS.map((day) => {
                                    const activity = ACTIVITIES.find(
                                        (a) => a.dayId === day.id && a.slotId === slot.id,
                                    );

                                    if (!activity) {
                                        return (
                                            <Box
                                                key={day.id}
                                                role="cell"
                                                sx={{ bgcolor: tone.bg, opacity: 0.5 }}
                                            />
                                        );
                                    }

                                    return (
                                        <ButtonBase
                                            key={day.id}
                                            role="cell"
                                            /* onClick={() => setSelected(activity)} */
                                            aria-haspopup="dialog"
                                            aria-label={`${activity.area}: ${activity.title.replace(
                                                '\n',
                                                ' ',
                                            )}. Ver actividad`}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                                textAlign: 'left',
                                                minHeight: 190,
                                                px: 3,
                                                py: 3,
                                                bgcolor: tone.bg,
                                                color: tone.fg,
                                                transition: 'background-color 160ms ease',
                                                '&:hover': { bgcolor: tone.hover },
                                                '&:hover .cta-arrow': { transform: 'translateX(3px)' },
                                                '&.Mui-focusVisible': {
                                                    outline: `2px solid ${tone.fg}`,
                                                    outlineOffset: -4,
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    letterSpacing: '0.12em',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {activity.area}
                                            </Typography>

                                            <Typography
                                                component="span"
                                                sx={{
                                                    fontSize: 22,
                                                    fontWeight: 700,
                                                    lineHeight: 1.1,
                                                    letterSpacing: '-0.03em',
                                                    whiteSpace: 'pre-line',
                                                }}
                                            >
                                                {activity.title}
                                            </Typography>

                                            <Box
                                                sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
                                            >
                                                <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>
                                                    Ver actividad
                                                </Typography>
                                                <ChevronRightIcon
                                                    className="cta-arrow"
                                                    sx={{
                                                        fontSize: 18,
                                                        transition: 'transform 160ms ease',
                                                    }}
                                                />
                                            </Box>
                                        </ButtonBase>
                                    );
                                })}
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* Nota inferior */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mt: 2.5 }}>
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: COLORS.accent,
                        flexShrink: 0,
                    }}
                />
                <Typography sx={{ fontSize: 13, color: COLORS.note }}>
                    {/* Haz clic en cada panel para consultar horarios, sede y descripción. */}
                    El comité organizador se reserva el derecho de modificar el programa según sea necesario.
                </Typography>
            </Box>

            {/* Modal */}
            <Dialog
                open={Boolean(selected)}
                onClose={() => setSelected(null)}
                fullWidth
                maxWidth="sm"
                aria-labelledby="activity-dialog-title"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 0,
                            bgcolor: selectedTone.bg,
                            color: selectedTone.fg,
                            boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
                        },
                    },
                }}
            >
                {selected && (
                    <DialogContent sx={{ p: { xs: 3, sm: 4 }, position: 'relative' }}>
                        <IconButton
                            onClick={() => setSelected(null)}
                            aria-label="Cerrar"
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                color: selectedTone.fg,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography
                            sx={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                mb: 2,
                            }}
                        >
                            {selected.area}
                        </Typography>

                        <Typography
                            id="activity-dialog-title"
                            component="h2"
                            sx={{
                                fontSize: { xs: 26, sm: 32 },
                                fontWeight: 700,
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                pr: 4,
                                mb: 3,
                            }}
                        >
                            {selected.title.replace('\n', ' ')}
                        </Typography>

                        <Divider sx={{ borderColor: selectedTone.divider, mb: 3 }} />

                        <Stack spacing={1.5} sx={{ mb: 3 }}>
                            <Stack direction="row" spacing={1.25} alignItems="center">
                                <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} />
                                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                                    {DAYS.find((d) => d.id === selected.dayId)?.label}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1.25} alignItems="center">
                                <AccessTimeIcon sx={{ fontSize: 20 }} />
                                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                                    {selected.time}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1.25} alignItems="center">
                                <PlaceOutlinedIcon sx={{ fontSize: 20 }} />
                                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                                    {selected.venue}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Typography sx={{ fontSize: 15, lineHeight: 1.6, maxWidth: '60ch' }}>
                            {selected.description}
                        </Typography>
                    </DialogContent>
                )}
            </Dialog>
        </Box>
    );
}