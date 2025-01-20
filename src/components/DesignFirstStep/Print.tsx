import React, { useState } from 'react';
import { Button, Typography, Select, MenuItem, TextField, Box, IconButton } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./DesignFirstStep.module.css";
import { makeStyles } from '@mui/styles';

interface PrintItem {
  id: number;
  confirmed: boolean;
  open: boolean;
  position: string;
  method: string;
  color: string;
}

export const PrintOptionsComponent: React.FC = () => {
  const [prints, setPrints] = useState<PrintItem[]>([]);

  const onAddPrint = () => {
    const newPrint: PrintItem = { id: prints.length + 1, confirmed: false, open: true, position: '', method: '', color: '' };
    setPrints([...prints, newPrint]);
  };

  const onConfirm = (id: number) => {
    setPrints(prints.map(print =>
      print.id === id ? { ...print, confirmed: true, open: false } : print
    ));
  };

  const onCancel = (id: number) => {
    setPrints(prints.map(print =>
      print.id === id ? { ...print, open: false } : print
    ));
  };

  const onEdit = (id: number) => {
    setPrints(prints.map(print =>
      print.id === id ? { ...print, open: true, confirmed: false } : print
    ));
  };

  const onDelete = (id: number) => {
    setPrints(prints.filter(print => print.id !== id));
  };

  const handleChange = (id: number, field: string, value: string) => {
    setPrints(prints.map(print =>
      print.id === id ? { ...print, [field]: value } : print
    ));
  };

  return (
    <>
      <Button onClick={onAddPrint} sx={{ display: 'flex', alignItems: 'center' }} className={styles["designfirststep__button"]}>
        <Typography
          variant="button"
          sx={{ textTransform: 'none' }}
          className="text_size_medium text_color_primary text_weight_semibold"
        >
          Добавить нанесение
        </Typography>
        <AddLinkIcon style={{ color: "var(--color-primary)", fontSize: "28px" }} />
      </Button>

      {prints.map((print) => (
        <div key={print.id}>
          {print.open && (
            <Box sx={{ mt: 2 }}>
              <Select
                fullWidth
                displayEmpty
                value={print.position}
                className={styles["designfirststep__print-option"]}
                onChange={(e) => handleChange(print.id, 'position', e.target.value)}
                sx={{ mt: 1,padding:"0 12px",color:"var(--color-primary)" }}
              >
                <MenuItem value="" disabled >
                  Место нанесения
                </MenuItem>
                <MenuItem value="Перед">Перед</MenuItem>
                <MenuItem value="Зад" >Зад</MenuItem>
              </Select>

              <Select
                fullWidth
                displayEmpty
                value={print.method}
                onChange={(e) => handleChange(print.id, 'method', e.target.value)}
                sx={{ mt: 1,color:"var(--color-primary)" }}
                className="text_size_medium text_color_primary text_weight_medium"
                defaultValue='Метод нанесения'
              >
                <Typography
                  variant="button"
                  sx={{ textTransform: 'none',color:"var(--color-primary)" }}
                  className="text_size_medium text_color_primary text_weight_regular"
                >
                  Метод нанесения
                </Typography>
                {/* <MenuItem value="" className="text_size_medium text_color_primary text_weight_semibold" disabled>
                  Метод нанесения
                </MenuItem>
                <MenuItem value="Печать">Печать</MenuItem>
                <MenuItem value="Вышивка">Вышивка</MenuItem> */}
              </Select>

              <Select
                fullWidth
                displayEmpty
                value={print.color}
                onChange={(e) => handleChange(print.id, 'color', e.target.value)}
                sx={{ mt: 1 }}
              >
                <MenuItem value="" disabled>
                  Цветность
                </MenuItem>
                <MenuItem value="Одноцветная">Одноцветная</MenuItem>
                <MenuItem value="Многоцветная">Многоцветная</MenuItem>
              </Select>

              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField label="Ширина" variant="outlined" fullWidth />
                <TextField label="Высота" variant="outlined" fullWidth />
              </Box>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">Цена за нанесение: 1000 руб.</Typography>
                <Typography variant="body2">Настройка печати: 500 руб.</Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button variant="outlined" onClick={() => onCancel(print.id)}>Отмена</Button>
                <Button variant="contained" onClick={() => onConfirm(print.id)}>Подтвердить</Button>
              </Box>
            </Box>
          )}

          {print.confirmed && !print.open && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography
                variant="body1"
                onClick={() => onEdit(print.id)}
                sx={{ cursor: 'pointer' }}
              >
                Нанесение {print.id}
              </Typography>
              <IconButton onClick={() => onDelete(print.id)} sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </div>
      ))}
    </>
  );
};