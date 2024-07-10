/*
 * @Author: yangmiaomiao
 * @Date: 2023-12-28 20:30:16
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-01-06 09:02:03
 * @Description: 
 */
interface ImportMetaEnv {
    VITE_APP_MODE: string;
    VITE_API_BASE_URL: string;
    
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}