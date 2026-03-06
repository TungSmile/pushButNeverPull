import { _decorator, Component } from 'cc';
import super_html_playable from './plugin/super_html_playable';
const { ccclass, property } = _decorator;
@ccclass('AdManager')
export class AdManager extends Component {

    androidLink: string = "https://play.google.com/store/apps/details?id=com.gplay.tile.aqua.girl";

    iosLink: string = "https://www.apple.com/app-store/";

    defaultLink: string = "https://play.google.com/store/apps/details?id=com.gplay.tile.aqua.girl";


    start() {
        super_html_playable.set_google_play_url(this.androidLink);
        super_html_playable.set_app_store_url(this.iosLink);
    }

    openAdUrl() {
        super_html_playable.game_end();
        super_html_playable.download();
    }
}


