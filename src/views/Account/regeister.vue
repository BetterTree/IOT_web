<template>
  <div class="register">
    <div class="register-box">
      <h1>注册</h1>
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item prop="userId">
          <el-input placeholder="用户名" type="text" v-model.trim="editForm.userId"></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            placeholder="密码"
            auto-complete="userPwd"
            type="password"
            v-model.trim="editForm.userPwd"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input
            placeholder="再次输入密码"
            type="password"
            auto-complete="confirmPwd"
            v-model.trim="editForm.confirmPwd"
          ></el-input>
        </el-form-item>
        <el-form-item prop="question">
          <el-select popper-append-to-body v-model="editForm.question" placeholder="安全问题">
            <el-option
              v-for="item in question"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="answer">
          <el-input placeholder="答案" type="text" v-model.trim="editForm.answer"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input placeholder="人机验证"></el-input>
        </el-form-item>-->
        <el-form-item style="text-align:left;margin-bottom:0px;margin-top:-22px">
          <el-checkbox v-model="agreed">我同意</el-checkbox>
          <a @click="dialogVisible=true">用户注册协议</a>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit()" :disabled="!agreed">注册</el-button>
          <router-link :to="{path:'/login'}">已经有账号了？点此登录</router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      center
      width="800px"
      custom-class="protocolDialog"
      title="树上科技物联网平台用户注册协议"
    >
      <div>在此特别提醒您在注册成为树上科技用户之前,请认真阅读本《树上科技用户注册协议(以下简称“协议”),确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款且完成注册程序后,才能成为树上科技的正式注册用户,并享受树上科技的各类服务。您的注册、登录、使用等行为将视为对本协议的接受,并同意接受本协议各项条款的约束。若您不同意本协议,或对本协议中的条款存在任何疑问,请您立即停止树上科技用户注册程序,并可以选择不使用树上科技服务。本协议条款是树上科技公司（以下称“树上科技”或“我们”）对用户相关政策的许诺,请您务必仔细阅读。</div>
      <ul>
        <li>
          <h6>1.用户信息采集</h6>当您在本网站/软件进行用户注册登记,使用本网站/软件的服务,以及参加本网站/软件的活动时,即为您同意本网站/软件将收集您的个人信息,并保存记录。
          本网站/软件收集的个人信息包括但不限于：姓名、性别、生日、城市、身份证号码、电子邮箱地址、手机电话、血型,收货地址等。您主动提供的信息越多及越准确,我们就能够更好地为您提供有关服务。
        </li>
        <li>
          <h6>2.用户信息的使用</h6>本网站/软件收集个人信息的基本目的是为了更好的了解我们的用户,以便向您提供特色服务和个性化服务。个人信息将主要用于以下几个目的：
          <ul>
            <li>(1)完成您对特定服务或产品的要求。</li>
            <li>(2)在我们提供服务时,用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途,确保我们向您提供的产品和服务的安全性。</li>
            <li>(3)帮助我们设计新服务,改善我们现有服务。</li>
            <li>(4)使我们更加了解您如何接入和使用我们的服务,从而针对性地回应您的个性化需求,例如语言设定、位置设定、个性化的帮助服务和指示,或对您和其他用户作出其他方面的回应。</li>
            <li>(5)用于对本网站/软件用户数据的统计（如用户数量、构成、兴趣、表现等,以便我们向用户提供更好的服务和产品,或向第三方为了一定的合法目的披露该类统计数据。该类统计数据都是用户群整体的信息,而非个人的信息。</li>
            <li>(6)让您参与有关我们产品和服务的调查。为了让您有更好的体验、改善我们的服务或您同意的其他用途,在符合相关法律法 规的前提下,我们可能将通过某一项服务所收集的信息,以汇集信息或者个性化的方式,用于我们的其他服务。例如,在您使用我们的一项服务时所收集的信息,可能在另一服务中用于向 您提供特定内容 , 或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项,您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。</li>
          </ul>
        </li>
        <li>
          <h6>3.用户信息的共享和披露</h6>树上科技信息所收集您的个人信息,将仅用于树上科技为您提供相关服务。一般情况下,在未得到您的同意之前,您的任何个人信息将不会被提供给无关的第三方。
          在下列情况下,我们可能会将您的个人信息提供给有关的第三方：
          <ul>
            <li>(1)本网站/软件的某些服务需由一个合作伙伴(如代理公司、提供相关技术服务的公司、运输公司、邮寄公司、提供奖品的公司等)提供或共同提供。 为了向您提供此类服务,本网站有必要与该合作伙伴分享您的个人信息。如果您不希望您的信息被分享, 您可以不使用该具体服务从而拒绝您的个人信息被披露。</li>
            <li>(2)本网站/软件可能会与第三方共同进行推广活动。在推广活动中所收集的全部或部分个人信息可能会与该第三方分享。如果您不想让您的信息被分享,您可以通过不参加该推广活动而拒绝。</li>
            <li>(3)根据法律法规或政府的强制性规定,我们必须向有关司法或政府部门提供您的个人信息。</li>
            <li>(4)为了防止他人的合法权益或社会公共利益受到重大危害。</li>
            <li>(5)为了防止您的合法权益受到重大危害。</li>
            <li>(6)我们发现您的行为违反了本网站/软件的服务条款或关于特定服务或产品的任何使用指引,或对树上科技信息的合法权益构成重大危害。</li>
          </ul>
        </li>
        <li>
          <h6>4.用户管理</h6>您可以在任何时候通过使用您的本网站/软件的注册用户名和密码,查询,补充或更正您的本网站/软件帐户中的个人信息, 或要求删除您的本网站/软件帐户中的个人信息。
          您在本网站/软件的帐户可以被删除,但这样会导致您不能够登录本网站/软件及使用本网站/软件的任何服务。若发现任何非法使用用户帐号或存在安全漏洞的情况 , 请立即通知本站并向公安机关报案。
          因用户未妥善保管其帐号名称及密码而导致第三人使用帐号而给用户造成的损失,由用户自行承担
          用户在注册及使用时应承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线 , 且用户对其发布的内容 ( 包括但不限于文字、图片等) 时 , 不得有以下情形：
          <ul>
            <li>(1)违反宪法或法律法规规定的;</li>
            <li>(2)危害国家安全,泄露国家秘密,颠覆国家政权,破坏国家统一的;</li>
            <li>(3)损害国家荣誉和利益的,损害公共利益的;</li>
            <li>(4)煽动民族仇恨民族歧视,破坏民族团结的;</li>
            <li>(5)破坏国家宗教政策,宣扬邪教和封建迷信的;</li>
            <li>(6)散布谣言,扰乱社会秩序,破坏社会稳定的;</li>
            <li>(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;</li>
            <li>(8)侮辱或者诽谤他人,侵害他人合法权益的;</li>
            <li>(9)含有法律、行政法规禁止的其他内容或违反树上科技的其他规定的。</li>
          </ul>用户以虚假信息骗取帐号名称注册,或其帐号头像、简介等注册信息存在违法和不良信息的,树上科技有权采取通知限期改正、暂停使用、注销登记等措施。树上科技帐号仅限于用户本人使用,严禁将您的树上科技帐号允许第三人使用,否则用户应承担由此产生的全部责任,并与实际使用人承担连带责任。
        </li>
        <li>
          <h6>5.信息安全</h6>您的本网站/软件帐户信息和本网站/软件档案通过密码来保护,只有您个人才有权获取 这些个人信息。我们建议您不要向任何他人泄露您的密码。本网站/软件也不会主动致电或 主动发电子邮件给您来询问您的密码,如果您遇到此类情况请及时与树上科技客服联系确认。同时,请您在完成工作后,务必退出您的本网站/软件帐户并关闭您的浏览器窗口,以便当您与他人合用一台电脑, 或正在公共场所使用电脑时, 保证他人无法获取您的个人信息和往来 通信。遗憾的是,任何通过互联网或无线网络的数据传输都无法获得绝对的安全保证。 所以, 在我们尽最大努力来保护您的个人信息的同时,本网站/软件不能对您向我们进行的信息传输,或我们所发的在线产品或服务的信息的安全作出肯定或保证。您作出上述行为时将自己承担风险。一旦我们收到您传输来的信息,我们将尽最大努力保证其在我们系统的安全。
        </li>
        <li>
          <h6>6.用户隐私制度</h6>我们会在您自愿的前提下收集您的个人信息并将这些信息进行整合,包括但不限于注册帐号时的相关信息和活动报名信息等。尊重用户个人隐私是树上科技的一项基本政策。所以 ,*** 不会公开或向任何第三方透露用户的注册资料以及用户因享受树上科技服务而提供的任何信息, 但以下情形除外 :
          <ul>
            <li>(1)事先获得用户的明确授权或许可;</li>
            <li>(2)遵守有关法律规定,包括在国家有关机关查询时,提供用户的注册信息、用户在本站发布的信息内容及其发布时间、互联网地址或者域名等</li>
            <li>(3)在紧急情况下竭力维护用户个人和社会大众的隐私安全;</li>
            <li>(4)根据本条款相关规定或者树上科技认为必要的其他情形。树上科技可能会与第三方合作向用户提供相关的网络服务,在此情况下,如该第三方同意承担与树上科技同等的保护用户隐私的责任,则树上科技可将用户信息提供给该第三方。</li>
          </ul>
        </li>
        <li>
          <h6>7.所有权及知识产权条款</h6>本“网站/软件”由树上科技拥有和运作。本“网站/软件”公开或显示的所有内容,包括但不限于文字、图表、照片、图像、动画、音效、插图及软件（简称“内容”）等,均属树上科技及其许可人或内容供应商所有。本“网站/软件”内的所有组成要素,包括但不限于整体设计及“内容”, 均受商业外观、版权、道德规范、商标及其它所有相关知识产权的法律保护。 除非依据本条款与条件或与经树上科技在其它协议的声明同意外, 本网站/软件內的任何部分或组 成要素或“內容”均不得以任何方式复制或传播。除非有明确协议同意,否则网站/软件中的“內容”及一切相关权利将为树上科技成员或其许可人的资产。
        </li>
        <li>
          <h6>8.责任限制</h6>除非另有明确的书面说明,本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品 (包括软件)和服务,均是在"按现状"和"按现有"的基础上提供的。除非另有明确的书面说明,我们不对本站的运营及其包含在本站上的信息、内容、材料、产品( 包括软件 )或服务作任何形式的、明示或默示的声明或担保(根据中华人民共和国法律另有规定的以外)。我们不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品(包括软件)和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。如因不可抗力或其它本站无法控制的原因使本站服务系统溃或无法正常使用导致服务不可用或网上交易无法完成或丢失有关的信息、记录等,我们会合理地尽力协助处理善后事宜
        </li>
        <li>
          <h6>9.免责声明</h6>客户明确同意使用树上科技服务的风险由客户承担。树上科技明确表示不提供任何类型的担保, 不论是明确的或隐含的。树上科技将尽力维护客户使用树上科技服务的合法权益,但不担保树上科技服务一定能满足客户的要求,也不担保服务的及时性、安全性、真实性、稳定性、正确性。对客户使用该等服务中出现的信息（包括但不限于客户发布的信息）删除或储存失败,树上科技亦不承担任何责任。 客户理解并接受下载或通过相应产品服务取得的任何信息资料取决于客户自己, 并自行承担系统受损、资料丢失以及其他任何风险。树上科技对客户在互联网上得到的任何商品购物服务、交易进程、招聘信息等,都不作担保。
          树上科技对直接、间接、偶然、特殊及继起的损害不负责任,这些损害来自：不正当使用树上科技服务及/或应用服务,在网上购买商品或类似服务,在网上进行交易,非法使用服务或客户传送的信息有所变动。树上科技对本项服务下涉及的境内外基础运营商的通信网络的故障、技术缺陷、覆盖范围限 制、不可抗力、计算机病毒、黑客攻击、客户所在位置、客户关机或其他非树上科技技术能力范 围内的事因等造成的服务中断、客户邮件内容丢失、出现乱码、错误接收、无法接收、迟延 接收不承担责任。
        </li>
      </ul>
      <div slot="footer">
        <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { requiredInput, maxInput, password } from '@/utils/validate'
import { question } from '@/constant'
export default {
  name: '',
  data () {
    return {
      question,
      editForm: {
        userId: '',
        userPwd: '',
        confirmPwd: '',
        question: null,
        answer: ''
      },
      agreed: false,
      rules: {
        userId: maxInput('用户名', 20),
        userPwd: password(),
        userName: requiredInput('用户名不能为空'),
        question: requiredInput('请选择问题'),
        answer: requiredInput('问题答案不能为空'),
        confirmPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请确认密码'))
              } else if (this.editForm.userPwd !== value) {
                callback(new Error('确认密码错误'))
              } else {
                callback()
              }
            },
            required: true,
            trigger: 'change',
            message: '确认密码错误'
          }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    submit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          this.registerAsync()
        }
      })
    },
    async registerAsync () {
      let { confirmPwd, ...data } = this.editForm
      let { resultcode } = await this.$api.register(data)
      if (resultcode === 0) {
        this.$message.success('注册成功')
        this.$router.push('/login')
      } else if (resultcode === 100) {
        this.$message.error('用户名已存在,请重新注册')
        this.editForm.userId = ''
      } else {
        this.$message.error('注册失败')
      }
    }
  }
}
</script>
<style lang="less">
.register {
  background: #f7f6fb;
  height: calc(100vh - 70px - 50px);
  text-align: center;
  display: flex;
  justify-content: center;
  .register-box {
    width: 500px;
    margin-top: 60px;
    h1 {
      font-size: 36px;
    }
    .el-form {
      margin-top: 35px;
      .el-form-item:nth-child(-n + 5) {
        margin-bottom: 30px;
      }
      .el-input {
        .el-input__inner {
          &:focus {
            border: 1px solid #dcdfe6;
          }
        }
      }
      .el-select {
        width: 500px;
      }
      .el-checkbox {
        color: #a6aab8;
        text-align: left;
      }
      .el-button {
        width: 500px;
        font-size: 28px;
        &:hover,
        &:focus {
          background: #3c4353;
          color: white;
        }
        & + a {
          display: block;
          color: #3c4353;
        }
        &:disabled {
          background: black;
        }
      }
    }
  }
  .protocolDialog {
    .el-dialog__header {
      .el-dialog__title {
        font-weight: bold;
      }
    }
    .el-dialog__body {
      height: 450px;
      overflow-y: auto;
      div {
        text-indent: 16px;
      }
      h6 {
        font-weight: bold;
      }

      line-height: 25px;
      &::-webkit-scrollbar {
        width: 6px;
        height: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: #cccccc;
        height: 20px;
      }

      &::-webkit-scrollbar-track {
        background: #e6e6e6;
      }
    }
    .el-dialog__footer {
      .el-button {
        background: #f6f7f9;
        color: #3c4353;
        &:hover,
        &:focus {
          background: #3c4353;
          color: white;
        }
      }
    }
  }
}
</style>
