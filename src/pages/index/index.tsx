import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import Parser from "../../components/Parser/Parser";

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  options = {
    addGlobalClass: true
  }

  render() {
    const content = `## MyBatisCodeHelper-Pro
### 功能
- 通过方法名(不需要方法的返回值和参数 会自动推导出来)来生成sql 可以生成大部分单表操作的sql 只需要一个方法的名字即可 会自动补全好方法的参数和返回值 和springdatajpa的语句基本一致
- sql全自动提示，sql正确性检测，插件会识别mybatis的一系列标签 如 include trim set where，在这些标签之后的sql可以自动提示数据库的字段，检测sql的正确性，从此不用担心sql写错
- 直接从Intellij自带的数据库或者配置一个数据库生成crud代码 自动检测好 useGeneratedkey 自动配置好模块的文件夹 只用添加包名就可以生成代码了
- 从java类生成建表语句
- 数据库添加字段后可以继续生成，不会修改之前已经在接口或xml添加的自定义的方法 无需再去进行手动的添加
- mybatis接口和xml的互相跳转 支持一个mybatis接口对应多个xml
- mybatis接口中的方法名重构支持
- xml中的 param的自动提示 if test的自动提示 resultMap refid 等的自动提示
- resultMap中的property的自动提示，检测，重构
- resultMap中column自动提示，检测
- xml中refid，resultMap等的跳转到定义
- 检测没有使用的xml 可一键删除
- 检测mybatis接口中方法是否有实现，没有则报红 可创建一个空的xml
- mybatis接口中一键添加param注解
- mybatis接口一键生成xml
- 完整的typeAlias支持
- param检测 检测#{ 中的内容是否有误
- ognl 支持 if test when test foreach bind中的自动补全，跳转和检测
- 支持spring 将mapper注入到spring中 intellij的spring注入不再报错 支持springboot
- 一键生成mybatis接口的testcase 无需启动spring，复杂sql可进行快速测试
- 一键生成表关联的join
- 一键从sql语句中 导出resultMap
### 通过数据库生成增删改查代码示例
![databaseCrud.gif](https://blog.werfei.com/upload/2020/2/databaseCrud-1f5d874abc8e45c0ac750003f2e929ac.gif)
[官方文档](https://gejun123456.github.io/MyBatisCodeHelper-Pro/)
<video id="video" controls="" preload="none" src="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.mp4"
poster="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg">
</video>
\`\`\`java
public static void main(String[] args){
}
\`\`\`
`
    return (
      <View className='index'>
        <Parser type='markdown' content={content} />
      </View>
    )
  }
}
