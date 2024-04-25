import { ElMessageBox } from 'element-plus'
import Router from '@/router';

export const isBonding = (tips = '当前未绑定手机号，是否前往绑定', callBack = () => Router.push({ name: 'MyInfo' }), cancelCall = () => { }) => {
  ElMessageBox.confirm(
    `${tips}`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      // center: true,
      type: 'warning'
    }).then(() => {
      callBack()
    }).catch(() => {
      cancelCall()
    });
}
