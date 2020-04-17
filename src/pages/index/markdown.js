export default `## MyBatisCodeHelper-Pro
### 功能
- ognl 支持 if test when test foreach bind中的自动补全，跳转和检测
- 支持spring 将mapper注入到spring中 intellij的spring注入不再报错 支持springboot
### 通过数据库生成增删改查代码示例
![databaseCrud.gif](https://blog.werfei.com/upload/2020/2/databaseCrud-1f5d874abc8e45c0ac750003f2e929ac.gif)
![logo.jpg](https://blog.werfei.com/upload/2020/4/logo-73120fba234949c6ad8dafb3756ac702.jpg)
[官方文档](https://gejun123456.github.io/MyBatisCodeHelper-Pro/)
<video id="video" controls="" preload="none" src="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.mp4"
poster="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg">
</video>
\`\`\`java
@Override
public int compareTo(Person o) {
    // TODO Auto-generated method stub
    //按照姓名的长度进行排序
    int num = this.name.length() - o.name.length();
    //按照年龄进行排序
    num = (num == 0) ? this.age - o.age : num;
    //按照姓名的字典顺序
    num = (num == 0) ? this.name.compareTo(o.name) : num;
    return num;
}

public class MyComparator implements Comparator<Student> {

@Override
public int compare(Student o1, Student o2) {
    // TODO Auto-generated method stub
    //按照姓名的长度进行排序
    int num = o1.getName().length() - o2.getName().length();
    //按照年龄进行排序
    num = (num == 0) ? o1.getAge() - o2.getAge() : num;
    //按照姓名的字典顺序
    num = (num == 0) ? o1.getName().compareTo(o2.getName()) : num;
    return num;
    }
}

//创建比较器对象
//MyComparator mc = new MyComparator();
//创建集合对象

//new 接口(){};相当于创建了一个实现这个接口的子类对象
//new 类(){};相当于创建了一个继承了这个类的子类对象
TreeSet<Student> ts = new TreeSet<Student>(
  new Comparator<Student>() {

    @Override
    public int compare(Student o1, Student o2) {
        //只按照年龄进行排序
        return o1.getAge() - o2.getAge();
    }

  }
);

\`\`\`
$\\Gamma$、$\\iota$、$\\sigma$、$\\phi$、$\\upsilon$、$\\Pi$、$\\Bbbk$、$\\heartsuit$、$\\int$、$\\oint$
|列头|列头2|列头3|
|-------|-------|-------|
|content1|content2|content3|
1. 121
2. 3223
> 段落引用 aaa`
