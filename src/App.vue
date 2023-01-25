<template lang="pug">
metainfo
  template(v-slot:title="{ content }")
    //- | {{ content ? `${content} — CABLE` : `CABLE by Joan Heemskerk` }}
    | {{ content }}

#app.text-base
  .min-h-screen.flex.flex-col

    //- HEADER AS INTRO
    header.fixed.top-0.left-0.w-full.z-20.pointer-events-none
      //- top bar
      .flex.flex-wrap.w-full.items-start.relative.z-10.mt-1.sm_mt-0
        //- laptop left
        .flex-1.sm_flex-none.flex.pointer-events-auto.items-end
          //- (folia logo link)
          //- template(v-if="isIndex")
          a.w-20.h-20.flex.p-3(href="https://folia.app", target="_blank", title="folia.app ↗")
            .w-full.flex.items-center.justify-center.pb-1.pr-px.rounded.text-red-500.mouse_hover_bg-black
              svg-fleuron(style="height:1.28em")
          //- (back btn)
          //- template(v-else-if="lastRt.name")
            button.w-22.h-22.sm_w-20.flex.w-full.items-center.justify-center.rounded.mouse_hover_bg-accent2.mouse_hover_text-accent1(@click="$router.go(-1)")
              arrow-left-icon.w-8.h-8.text-current
          //- (back link)
          //- template(v-else)
            router-link.w-22.h-22.sm_w-20.flex.w-full.items-center.justify-center.rounded.mouse_hover_bg-accent2.mouse_hover_text-accent1(:to="$route.params.networkName ? { name: 'network-index', params: $route.params } : `/`")
              arrow-left-icon.w-8.h-8.text-current

          router-link.h-20.flex.items-center.-ml-px.sm_pr-6.leading-none(to="/")
            div.align-baseline
              h1.inline-block.text-3xl.md_text-2xl.mt-1.tracking-wide CABLE
              //- .inline-block.border-b.opacity-70.w-24.-mb-3px
              //- div.inline-block.text-smaller.opacity-90 JOAN HEEMSKERK

        //- laptop right
        nav.sm_h-20.w-full.sm_w-auto.sm_flex-1.flex.justify-end.md_justify-end.items-center.px-3.sm_pr-2px.md_px-10.leading-none.text-smm
          .grid.grid-cols-2.md_flex.gap-2px.flex-1.md_flex-none.pointer-events-auto.text-black
            //- (info btn)
            button.btn.btn-cyan.flex-1.md_w-auto.md_px-12(@click="openInfoOverlay")
              | info
            
            //- (info btn)
            router-link.btn.btn-cyan.flex-1.md_w-auto.md_px-10(:to="{name: 'mints'}")
              | cables
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mb-2px ml-1px">
                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
              </svg>

            //- (mint dropdown)
            div.flex-1.md_w-auto
              button.btn.btn-green.w-full.bg-accent4.md_pl-12.md_pr-7.active_opacity-40(@click="mintMenuVisible = !mintMenuVisible", :class="{'opacity-40': mintMenuVisible}")
                div.ml-7.md_ml-0 mint
                svg-chevron-down.w-6.h-6.mx-2.mb-1(strokeWidth="1")

              //- (dropdown)
              //- TODO - catch if they need to connect (don't close on v-click-outside)
              .relative(v-show="mintMenuVisible")
                .absolute.top-0.left-0.sm_left-auto.sm_right-0.pt-1.sm_pt-2.w-full.sm_w-84
                  mint-panel

            //- (connect btn)
            template(v-if="!$store.state.address")
              button.btn.btn-yellow.flex-1.md_w-auto.md_px-10(@click="connectWallet")
                | connect
                div(style="font-size:0.9em") ꩜

            //- (connected dropdown)
            template(v-if="$store.state.address")
              div.text-accent1.text-smm
                button.btn.btn-yellow.w-full.block.pl-7.bg-yellow-500(@click="userMenuVisible = true")
                  addr(:address="$store.state.address")
                  svg-chevron-down.w-6.h-6.mx-2.mb-1(strokeWidth="1")

                .relative(v-if="userMenuVisible", v-click-outside="() => { userMenuVisible = false }")
                  .absolute.top-0.right-0.pt-2
                    ul.bg-yellow-500.rounded.overflow-hidden
                      //- li
                        .btn-yellow.block.px-4.py-2.-mb-2(:to="myProfileRt") my cables
                      li
                        button.block.text-left.btn-yellow.w-full.px-4.py-2(@click.stop="disconnectWallet") sign-out

      //- bg gradient
      //- .sm_hidden.absolute.overlay.bg-gradient-to-b.from-accent1.to-transparent.pointer-events-none(style="height:200%")
            

    //- (info overlay)
    .fixed.pt-44.sm_pt-20.md_pt-18.z-40.overlay.overflow-y-scroll.scrollbars-hidden(ref="infoEl", :class="{'pointer-events-none': !infoVisible}")
      //- (reveals as background fades in)
      .relative.px-3.sm_px-1.md_px-10
        .flex.justify-end.items-start
          //- info card
          .relative.z-10.bg-accent3.text-black.rounded.border-accent3.overflow-hidden(@click.stop, v-show="infoVisible", style="box-shadowff: #f72d8e 0 4px 98px; box-shadowoff: rgba(0,0,0,0.75) 0px 2px 4px inset")
            .px-6.md_px-9.py-9.leading-chill.text-sm.tracking-wide.w-full(style="max-width:46em")
              p.text-sm.-ml-1
                | #[a.font-bold(href="https://folia.app", target="_blank", rel="noopener noreferrer") #[svg-fleuron.inline-block(style="height:1.1em;margin-bottom:0.25em;margin-right:0.12em")] #[span.underline folia]] presents&hellip;<br>
              p.mt-em
                | #[b cable] &mdash; a collection of 545, unique, &lsquo;on-chain&rsquo; NFTs by artist #[b #[a.underline(href="https://joanheemskerk.com"  target="_blank") Joan Heemskerk]] (#[a.underline(href="https://wwwwwwwww.jodi.org/" target="_blank") JODI])
              
              //- p.mt-em today, the Submarine Cable System consists of 545 fiber-optic cables that deliver 95% of all international internet traffic.

              p.mt-em each minted NFT in the collection reveals a different cable of the #[b Submarine Cable System]&nbsp;&mdash; expressed as an .SVG animation, fully hosted and rendered on the #[b Ethereum] blockchain.

              //- p.mt-em subsea cable owners/operators can deploy cable stations that open gateways between continents and interconnect around the world.

              //- p.mt-em each NFT (randomly revealed on mint) expresses a different subsea cable loaded with a [ + || - ] stream of data waves as an .SVG animation completely on the ethereum chain by the contract.
              
              //- p.mt-em 🌊🌊🌊🌊🌊🌊
              
              //- p.mt-em all the world’s undersea cables are vulnerable, some failures are caused by natural hazards like #[a(href="https://www.youtube.com/watch?v=1ex7uTQf4bQ" target="_blank" rel="noopener noreferrer" class="underline") sharks], but the vast majority of cable faults are caused by human activities !
              
              //- p.mt-em #[b ADOPT A CABLE!!]
              
              //- p.mt-em #[a.underline(href="https://joanheemskerk.com"  target="_blank") Joan Heemskerk] is a contemporary artist who makes WWWorks in the cloud. _ She is also a member of the art collective JODI >>> (#[a.underline(href="http://jodi.org"  target="_blank") jodi.org]) - pioneered net.art in 1995. JODI were among thd first artists to inves|igate and subvert conventkoos od |he`Internet, compute?programs, and vhdeo ajd computer gamus. Radically di{rupting The ver9 languawe of t`ese systemr, including risual aesthepics, iNterface elemen}q? commandS, errors and?code. ?ODI staes ext?ema digmtal(intesventionq!that deStakilizg the reliTiofShip bdTween cmputer tdchnolOgy and ids use03jy sufterting oub(d8pectatIofs abkup?4jm?g?nctignah)tieS and conventio.s /f the sqrtees that ?e0Eepend upol eve2y?p?y. Tlcir wkr?!u?es thev?tasv pmsskble r`riudy f mudi` ane te?h?iqtes."frgm$insTalli?ionc, s/Ltw?re?Qod wd"sites to Pesf/zma?caw?aNd exhibitiof{.$
              
              p.mt-em
                | #[span(style="font-size:0.9em") ꩜] connect an #[a(href="https://ethereum.org/en/wallets" target="_blank" rel="noopener noreferrer" class="underline") Ethereum wallet] to mint a cable
                <br>
                | &larr; click/hover on cables <button class="underline" @click.stop="closeInfoOverlay">in the map</button> for info
                template(v-if="$store.state.mintCount")
                  <br>
                  | (or #[router-link(:to="{name: 'mints'}" class="underline") view all] minted cables)

            footer.w-full.grid.grid-cols-3.border-t.text-smm
              a.btn-cyan.h-10.flex.items-center.pl-2.pt-1.border-r.border-gray-700(:href="$store.getters.etherscanLink({ networkName: 'ethereum' })", target="_blank", rel="noopener noreferrer")
                | contract #[span.ml-1(style="font-size:0.75em") ↗]

              a.btn-cyan.h-10.flex.items-center.pl-2.pt-1.border-r.border-gray-700.mouse_hover_bg-black(:href="$store.getters.marketplaceLink({ networkName: 'ethereum', path: '/collection/cable-' })", target="_blank", rel="noopener noreferrer")
                | opensea #[span.ml-1(style="font-size:0.75em") ↗]

              a.btn-cyan.h-10.flex.items-center.pl-2.pt-1.mouse_hover_bg-black(:href="discordLink", target="_blank", rel="noopener noreferrer")
                | discord #[span.ml-1(style="font-size:0.75em") ↗]


            //- close btn
            button.absolute.top-0.right-0.w-16.h-16.flex.items-center.justify-center.bg-black-a08ff(@click.stop="closeInfoOverlay")
              svg-x.w-5.h-5(strokeWidth="1.15")

        //- scroll off area
        #info-scroll-end.pointer-events-none(style="height:calc(100vh - 1px)")
        observer.block.pointer-events-none.h-screen(:threshold="0.01", @visible="closeInfoOverlay")

        //- background
        button.block.absolute.overlay.bg-black-a60ff.transition.duration-1000(:class="{'opacity-0 pointer-events-none': !infoVisible}", @click.stop="infoVisible = false", aria-label="Close Info")

    //- main
    main.app_main.flex-1(@click="closeMenus")
      router-view(v-slot="{ Component }")
        component(:is="Component")

    //- footer?
  
  //- template(v-if="isWrongNetwork")
    //- .p-8 Oops
    .sticky.z-50.bottom-0.left-0.w-full.p-6.md_p-8.bg-yellow-500.text-black.text-center.-shadow-md.font-sans.text-sm.md_text-base.lg_text-lg
      //- (v-html="'Wrong&nbsp;Network&nbsp;🤖 Please&nbsp;switch&nbsp;to&nbsp;Mainnet'")
      | 🤖 Wrong Network!
      //- .absolute.top-0.right-0.h-full.flex.items-center.px-6.md_p-8
      button.absolute.top-0.right-0.h-full.bg-black-a15.px-8.md_px-12.mouse_hover_bg-black-a30(@click="switchToAppNetwork", style="font-size:0.875em") Switch
</template>

<script>
// import Notifications from './components/Notifications.vue'
// import Status from './components/Status.vue'
// import '@/style/_main.css'
import ConnectDisconnectBtn from '@/components/ConnectDisconnectBtn.vue'
import SvgLogo from '@/components/SvgLogo.vue'
import SvgFleuron from '@/components/SVG-Fleuron.vue'
import SvgX from '@/components/SVG-X.vue'
import Observer from '@/components/Observer.vue'
import Addr from '@/components/Addr.vue'
import SvgChevronDown from '@/components/SvgChevronDown.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import MintPanel from '@/components/MintPanel.vue'
export default {
  name: 'App',
  components: { ConnectDisconnectBtn, SvgLogo, MintPanel, SvgFleuron, SvgX, Observer, Addr, SvgChevronDown, ArrowLeftIcon },
  // metaInfo: {
  //   titleTemplate: (ttl) => {
  //     return ttl ? `${ttl} :: s̷̰̃t̴̫̊r̶͔̽ả̷̜y̴̼͂l̸̙͛į̸͆g̴̘̎h̷̜̀ṭ̸͂ ̸̰̊p̵̞̅ȑ̴̙ơ̸͍t̶̗̑o̶͂͜ć̵͍ȏ̸͕l̷̗͗` : 's̷̰̃t̴̫̊r̶͔̽ả̷̜y̴̼͂l̸̙͛į̸͆g̴̘̎h̷̜̀ṭ̸͂ ̸̰̊p̵̞̅ȑ̴̙ơ̸͍t̶̗̑o̶͂͜ć̵͍ȏ̸͕l̷̗͗ by Paul Seidler'
  //   }
  // },
  data () {
    return {
      infoVisible: false,
      userMenuVisible: false,
      mintMenuVisible: false,
      discordLink: import.meta.env.VITE_APP_DISCORD_LINK,
      lastRt: this.$route
    }
  },
  computed: {
    isWrongNetwork () {
      const id = this.$store.state.networkId
      return id && (id !== Number(this.$store.state.appDefaultNetworkId))
    },
    isIndex () {
      return !this.$route.name || this.$route.name === 'home'
    },
    myProfileRt () {
      const networkName = this.$route.params.networkName
      const address = this.$store.state.address
      return address ? 
        networkName ? {name: 'profile-network__worlds', params: { address, networkName }}
          : { name: 'profile', params: { address }}
            : null
    }
  },
  methods: {
    // async switchToAppNetwork () {
    //   try {
    //     if (!window.ethereum) { throw new Error('No provider to change network') }

    //     await window.ethereum.request({
    //       method: 'wallet_switchEthereumChain',
    //       params: [{ chainId: '0x' + this.$store.state.appDefaultNetworkId }]
    //     })

    //     // reload app
    //     window.location.reload()
    //   } catch (e) {
    //     console.error(e)
    //     alert('Could not switch networks')
    //   }
    // },
    // info overlay
    async openInfoOverlay () {
      this.closeMenus()
      this.infoVisible = true
      await this.$nextTick()
      this.$refs.infoEl.scrollTo(0, 0)
    },
    closeInfoOverlay () {
      this.infoVisible = false
    },
    // end info overlay

    closeMenus () {
      this.mintMenuVisible = false
    },

    async connectWallet () {
      try {
        await this.$store.dispatch('connect')
      } catch (e) {
        console.error(e)
        if (e !== 'Modal closed by user') {
          alert('Error connecting wallet!')
        }
      }
    },

    async disconnectWallet () {
      try {
        await this.$store.dispatch('disconnect')
        this.userMenuVisible = false
      } catch (e) {
        alert("error disconnecting wallet")
      }
    },

    onMintDropdownClickOutside (e) {
      // ignore web3modal clicks (connect on mint)
      if (e.path.find(el => el.className?.includes('web3modal'))) {
        return
      }
      this.mintMenuVisible = false
    }
  },
  created () {
    this.$store.dispatch('init')
  },
  mounted () {
    // this.$store.dispatch('listenForMints')
    // hide loading overlay
    return document.getElementById('loading')?.remove()
  },
  watch: {
    '$route' (newRt, oldRt) {
      this.userMenuVisible = false
      this.infoVisible = false
      if (newRt.path !== oldRt.path) {
        this.lastRt = oldRt
      }
    }
  }
}
</script>

<style>
/*@import './style/global';*/
/*@import './style/imports';*/
/*@import './style/variables';*/
/* @import './style/transitions'; */

html {
  /*font-family: var(--serif);*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*font-size:var(--basefont);*/
}

/* #app nav .router-link-active{
  @apply bg-accent2 text-accent1
} */

.app__main{
  transition:transform 500ms;
  transform-origin:top right;
}
.app__main--squished{
  transform:scale(0.0833,1);
}
.app__notifications{
  transition:transform 500ms;
  transform-origin:top left;
}
.app__notifications--squished{
  transform:scale(0,1);
}

@media (--breakpoint-md){
  .app__main.app__main--squished{
    transform:scale(0.5,1);
  }
}
@media (--breakpoint-lg){
  .app__main.app__main--squished{
    transform:scale(0.5833,1);
  }
}

/* web3 modal styling */
#WEB3_CONNECT_MODAL_ID .web3modal-modal-lightbox{
  font-family: var(--ff-sans);
  z-index: 1000;
}

button{
  font-weight: inherit;
  color:inherit;
  letter-spacing: inherit;
}

input{
  appearance:none;
  letter-spacing: inherit;
  line-height: inherit;
  color: inherit;
  background: transparent;
  &::placeholder{
    color:inherit;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
}

.info-tag{
  @apply  inline-block border rounded-xl px-1 text-accent2 bg-accent1
}

/* info transition */
.y-squish-enter-active,
.y-squish-leave-active{
  transition: transform 1000ms 600ms, max-height 1000ms 600ms;
  transform-origin:top center;
}
.y-squish-enter,
.y-squish-leave-to{
  transform:scale(1,0);
  max-height:0;
}
.y-squish-enter-to,
.y-squish-leave{
  max-height:calc(100vw / 3);
}
</style>
