class VIDEOPLAYER {
    constructor(videoElement) {
        this.$videoElement = videoElement;
        this.$videoPlayer = this.$videoElement?.querySelector(".video");
        this.$playBtn = this.$videoElement?.querySelector("[control='play']");
        this.$pauseBtn = this.$videoElement?.querySelector("[control='pause']");
        this.$muteBtn = this.$videoElement?.querySelector("[control='mute']");
        this.$unMuteBtn = this.$videoElement?.querySelector("[control='unmute']");
        this.widthOfVideo = parseFloat(window.getComputedStyle(this.$videoPlayer).width);
        this.heightOfVideo = parseFloat(window.getComputedStyle(this.$videoPlayer).height);
        this.videoId = this.$videoElement?.getAttribute("data-video");
        this.player = null;
        this.init();
    }

    init() {
        this.addPlayer();
        this.addHoverIn();
        this.addHoverOut();
    }

    isMobile() {
        return window.innerWidth > 768;
    }

    addPlayer() {
        this.player = cloudinary.videoPlayer(this.$videoPlayer, {
            cloudName: 'dzqyqdf2o',
            fluid: false,
            controls:false,
            muted: true,
            autoplay: true,
            loop: true,
            height: this.heightOfVideo,
            width: this.widthOfVideo,
            preload: "metadata"
        });

        this.player.source(this.videoId, {
            transformation: { width: this.widthOfVideo, height: this.heightOfVideo, crop: 'fit' },
            sourceParams: {
                source_types: ['mp4'],
            },
        });

        this.player.pause();
    }

    addHoverIn() {
        if (this.isMobile()) {
            this.$videoElement?.addEventListener("mouseover",async () => {
                this.player.play();
                if(this.player.isMuted()){
                    this.$unMuteBtn.style.display="block";
                    this.$muteBtn.style.display="none";
                }else if(!this.player.isMuted()){
                    this.$unMuteBtn.style.display="none";
                    this.$muteBtn.style.display="block";
                }
            })
            this.$muteBtn.addEventListener("click",()=>{
                // console.log("click")
                this.player.mute();
                this.$unMuteBtn.style.display="block";
                    this.$muteBtn.style.display="none";
            })
            this.$unMuteBtn.addEventListener("click",()=>{
                // console.log("click")

                this.player.unmute();
                this.$unMuteBtn.style.display="none";
                    this.$muteBtn.style.display="block";
            })
        }
        else if (!this.isMobile()) {
            this.$videoElement.setAttribute("playing", false);
            this.$playBtn.style.display = "block" 
            this.$pauseBtn.style.display = "none" 
            this.$videoElement?.addEventListener("click",() => {
                if (this.$videoElement.getAttribute("playing") == "false") {
                    this.player.play();
                    this.player.unmute();
                    this.$playBtn.style.display = "none"
            this.$pauseBtn.style.display = "block"
                    changeAttributes(this.$videoElement);
                    this.$videoElement.setAttribute("playing", true);
                    this.hidePause(this.$pauseBtn)

                }
                else if (this.$videoElement.getAttribute("playing") == "true") {
                    this.player.pause();
                    this.$videoElement.setAttribute("playing", false);
                    this.$playBtn.style.display = "block"
                    this.$pauseBtn.style.display = "none"

                }

            })
        }

    }

    hidePause(btn){
        setTimeout(()=>btn.style.opacity=0,2000)
    }

    addHoverOut() {
        if (this.isMobile()) {
            this.$videoElement?.addEventListener("mouseout", () => {
                this.player.pause();
                this.$playBtn.style.opacity = 1 
            this.$pauseBtn.style.opacity = 0 

            })
        }
    }
}

let $allVideoElements

function changeAttributes(currentElement){
    $allVideoElements.forEach(element => {
        if(element !== currentElement){
            if(element.getAttribute("playing")=="true"){
                currentElement.setAttribute("playing", false);
                element.click();
            }
        }
    })
}
window.addEventListener("load", () => {
    $allVideoElements = document.querySelectorAll("[data-video]");
    if ($allVideoElements?.length > 0) {
        $allVideoElements.forEach(element => {
            new VIDEOPLAYER(element);
        })
    }
})