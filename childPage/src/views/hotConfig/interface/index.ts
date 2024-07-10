/*
 * @Author: yangmiaomiao
 * @Date: 2024-01-09 15:05:30
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-03-12 19:10:15
 * @Description: 
 */


/**
 * 查询
 */
export interface SearchDataProps {
  [key: string]: any;
  categoryType?: string; //热点类型
  hotFre?: string; //设置热点监控统计频率
  hotTime?: string; //热点监控持续时间阈值 格式：连续时间10分钟  10mm
  hotFailuretime?: string; //热点监控失效时间阈值
  cancelhotFre?: string; //取消热点监控统计频率
  cancelhotTime?: string; //取消热点监控持续时间阈值
  cancelhotFailuretime?: string; //取消热点监控失效时间阈值
  hotValue?: string; //设置热点监控数量阈值
  cancelhotValue?: string; //取消热点监控数量阈值
  hotspotModeType?: string; //热点模式类型
  useStatus?: string; //状态
}


//状态三的时候显示
// cronVal: string; //Cron参数
// cleanDay: string; //过期时间 清理当天之前的历史数据 day

/**
 * 编辑
 */
export type StatusType = "add" | "edit";

export interface EditDataProps {
  [key: string]: any;
  visible: boolean;
  data: {};
  type: StatusType;
  formList?: any[];
}

export interface FormListProps {
  label: string; // 表单标签
  prop: string; // 表单字段
  type: string; // 表单类型
  options?: any[]; // 表单选项
  disabled?: boolean; // 是否禁用
  required?: boolean; // 是否必填
  rules?: any[]; // 表单验证规则
}