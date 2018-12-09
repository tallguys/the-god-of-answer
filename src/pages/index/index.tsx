import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtDivider, AtToast } from 'taro-ui'
import './index.scss'
import answers from '../../enums/answers';

type MyProps = {}
type MyState = {
  isOpened: boolean,
  answer: string,
  loading: boolean,
  btnDisabled: boolean
}

export default class Index extends Component<MyProps, MyState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '答案之神'
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      answer: '',
      loading: false,
      btnDisabled: false
    }
    this.getAnswer = this.getAnswer.bind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getAnswer(event) {
    this.setState({
      isOpened: false,
      loading: true,
      btnDisabled: true
    });

    const ramdon = Math.floor(Math.random() * 1000);
    const answer = answers[Math.floor(Math.random() * answers.length)];

    setTimeout(() => {
      this.setState({
        isOpened: true,
        answer: answer,
        loading: false,
        btnDisabled: false
      });
    }, 500 + ramdon);
    event.preventDefault();
  }

  render() {
    return (
      <View className='index'>
        <View className='manual-container'>
          <View className='title'><Text># Hello</Text></View>
          <AtDivider />
          <View className='list'><Text>这是一款可以在你陷入麻烦摇摆不定左右为难犹豫不决时给予你帮助的app。</Text></View>
        </View>
        <View className='manual-container'>
          <AtDivider />
          <View className='title'><Text># 使用手册</Text></View>
          <AtDivider />
          <View className='list'><Text>1. 双手捧起手机，贴胸而放。</Text></View>
          <View className='list'><Text>2. 默想你心中的问题。</Text></View>
          <View className='list'><Text>3. 闭上眼睛，默想问题三遍。</Text></View>
          <View className='list'><Text>4. 深呼吸，睁开眼睛点击按钮。</Text></View>
          <View className='list'><Text>5. 希望答案对你的人生有帮助。</Text></View>
        </View>
        <View className='button-container'>
          <AtButton className='button' size='normal' circle type='primary'
            loading={this.state.loading}
            disabled={this.state.btnDisabled}
            onClick={this.getAnswer}>请给我答案吧！</AtButton>
        </View>
        <AtToast
          isOpened={this.state.isOpened}
          text={this.state.answer}
          duration={5000}>
        </AtToast>
      </View >
    )
  }
}
