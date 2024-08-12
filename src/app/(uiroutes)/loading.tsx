import { Box, CircularProgress } from "@mui/material";
import styles from "./page.module.css";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Box className={styles.main} sx={{width: '100%' , justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </Box>
  );
}
