# TelegramR

高仿Telegram app react-native版, 完成度30%，设计模式主要借鉴了[telegram-react](https://github.com/evgeny-nadymov/telegram-react)，未接入api，仅用于展示

### 截图

Drawer | ChatList | Chat | StickerDialog | MenuDialog | Screen
:-: | :-: | :-: | :-: | :-: | :-:
![](https://wx1.sinaimg.cn/large/006nOlwNly1gdnjtfoeoxj30u01t0dq3.jpg) | ![](https://wx1.sinaimg.cn/large/006nOlwNly1gdnjtfjjc5j30u01t049k.jpg) | ![](https://wx1.sinaimg.cn/large/006nOlwNly1gdnjtgd3e6j30u01t07nq.jpg) | ![](https://wx1.sinaimg.cn/large/006nOlwNly1gdnjthr4i0j30u01t0x14.jpg) | ![](https://wx1.sinaimg.cn/large/006nOlwNly1gdnjthn7onj30u01t0e1d.jpg) | ![](./screen.gif)

### DownLoad

[Android V1.0.0 preview](https://github.com/telegramr/TelegramR/releases/download/V1.0.0/TelegramR_V1.0.0.apk)

### 已完成

- 消息列表
- 消息选择
- 完成部分消息实体
- Lottie动画s
- i18n
- 发送静态消息


> Q: 会弃坑吗

A: 会！原因：

 - 性能方面：react-native 自带的FlatList性能依然低下，复杂数据类型过百条就有卡顿现象了，导致渲染空白
 - 手势响应不兼容：react-native-gesture-handler功能太少，多个手势嵌套情况下导致
不能正确识别或响应缓慢，有时候不得不用原生来写(可惜我不会= =)
- telegram 没有react-native版SDK，所以这只是一个demo

>  Q: 有些消息实体渲染不对

A: 因为消息api需要向telegram 官方申请token授权才能用，现在展示的消息为缓存信息。另外部分消息因为隐私问题被删了，所以可能会导致渲染不正确

