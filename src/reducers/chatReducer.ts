import * as types from '../constants/Types';

const initialState = {
  avatar: 'https://lain.bgm.tv/pic/cover/l/ec/f2/240193_36yPP.jpg',
  title: '摇曳百合',
  notice: '置顶消息fekofkoefkoefkeofkefke',
  lists: [
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: true,
      uname: 'Beats0',
      avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
      message: [
        'https://lain.bgm.tv/pic/cover/l/f2/9f/28900_PB3pC.jpg',
        'https://lain.bgm.tv/pic/cover/l/ee/2a/19696_23iP3.jpg',
        'https://lain.bgm.tv/pic/cover/l/43/d9/14588_bDB2r.jpg',
      ],
      date: '12: 47',
      type: 'img'
    },
    {
      id: '2',
      from_id: '2',
      to_id: '3',
      out: false,
      uname: '赤座あかり',
      avatar: 'https://lain.bgm.tv/pic/crt/l/19/44/13004_crt_kiafp.jpg',
      message: '因为是个好孩子所以被赐予主人公的宝座，但是存在感却因其他角色而渐渐被淡化中，因此没有多少主角的感觉。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '歳納京子',
      avatar: 'https://lain.bgm.tv/pic/crt/s/05/98/13005_crt_o8PHg.jpg',
      message: '暴走状态时周围的人完全无法阻止，没人能够跟上她的步调也没问题。实质是从事同人活动的宅女。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '船見結衣',
      avatar: 'https://lain.bgm.tv/pic/crt/s/7f/f6/13006_crt_44395.jpg',
      message: '负责对京子的吐槽。作为一人独居的少女，有很黑暗、很深的…其实基本没有。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '吉川ちなつ',
      avatar: 'https://lain.bgm.tv/pic/crt/s/4c/ee/13007_crt_U3Pqv.jpg?r=1444773044',
      message: '与人气动画《小魔女米拉库》的主人公相似，是会装可爱的女孩子。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '杉浦綾乃',
      avatar: 'https://lain.bgm.tv/pic/crt/s/69/60/13008_crt_4B7Zn.jpg?r=1447203401',
      message: '视京子为对手…这是骗人的，其实是恋爱中的纯情少女。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '池田 千鶴',
      avatar: 'https://lain.bgm.tv/pic/crt/s/d9/ec/27904_crt_4Fs21.jpg?r=1425883024',
      message: '池田千岁的双胞胎妹妹，讨厌京子，喜欢幻想姐姐×绫乃。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '大室櫻子',
      avatar: 'https://lain.bgm.tv/pic/crt/s/67/49/13012_crt_xrLRL.jpg?r=1445999756',
      message: '以下届学生会副会长为目标的傲娇少女。与向日葵组成傲娇×傲娇的一对CP！？',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '古谷向日葵',
      avatar: 'https://lain.bgm.tv/pic/crt/s/52/68/13011_crt_Q0abK.jpg?r=1446599422',
      message: '以下届学生会副会长为目标的傲娇少女。另外，是巨乳。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '池田千歳',
      avatar: 'https://lain.bgm.tv/pic/crt/s/72/33/13010_crt_Z2IdD.jpg?r=1447801919',
      message: '通过过激的百合妄想，而使被忘掉的百合度急剧上升的好人。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '赤座あかね',
      avatar: 'https://lain.bgm.tv/pic/crt/m/c7/dc/16802_crt_a49kW.jpg',
      message: '灯里的姐姐，19岁的大学生，同灯里一样的发色，不过留长发，长发后还有扎有一小撮短发，绑有一个团子。常以笑脸示人。与千夏的姐姐吉川智子相识。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '西垣 奈々',
      avatar: 'https://lain.bgm.tv/pic/crt/g/09/6c/27905_crt_2arPK.jpg',
      message: '理科教师，喜欢做奇怪的实验，经常引起爆炸。唯一能解读松本的人。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '松本 りせ',
      avatar: 'https://lain.bgm.tv/pic/crt/g/d8/7e/27906_crt_R9WqN.jpg?r=1450230204',
      message: '学生会长，比阿卡林更没有存在感的人。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '古谷楓',
      avatar: 'https://lain.bgm.tv/pic/crt/g/b9/cb/29773_crt_Uf4Mn.jpg?r=1425882930',
      message: '向日葵的妹妹，6岁，同向日葵几乎一样的外貌，不过眉毛较粗，10月30日出生。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '船见 まり',
      avatar: 'https://lain.bgm.tv/pic/crt/g/bd/af/30883_crt_jjzj6.jpg?r=1425884194',
      message: '结衣亲戚的小孩，喜欢吃海胆寿司。个性沉默而且成熟，也有小孩天真的一面，崇敬结衣。喜欢看《小魔女米拉库》',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '大室 撫子',
      avatar: 'https://lain.bgm.tv/pic/crt/g/0e/13/30876_crt_Qb116.jpg?r=1448413754',
      message: '櫻子と花子の姉。18歳。1月21日生まれ。 櫻子に比べて冷めた性格であり、櫻子のことを厄介に思っている面がある。櫻子より髪が短い。',
      date: '12: 47',
      type: 'text'
    },
    {
      id: '1',
      from_id: '1',
      to_id: '2',
      out: false,
      uname: '大室 花子',
      avatar: 'https://lain.bgm.tv/pic/crt/g/a4/de/30880_crt_iKdd9.jpg?r=1425883968',
      message: '櫻子と撫子の妹。8歳。8月7日生まれ。 櫻子のことを呼び捨てにしている。しっかり者で、学校のクラスメイト達からは「花子様」と呼ばれている。',
      date: '12: 47',
      type: 'text'
    }
  ],    // 消息列表
  isRefresh: false,
  isEnd: false
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CHAT_MESSAGE:
      return {
        ...state,
        lists: [...state.lists, action.messageObj]
      }
    case types.REMOVE_CHAT_MESSAGE:
      return {
        ...state,
        lists: state.lists.filter(i => i.id !== action.messageId)
      }
    case types.SET_REFRESH_STATUS:
      return {
        ...state,
        isRefresh: action.isRefresh
      }
    case types.SET_IS_END:
      return {
        ...state,
        isEnd: action.isEnd
      }
    default:
      return state;
  }
}
