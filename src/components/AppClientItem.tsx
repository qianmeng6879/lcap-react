
import { AppClient } from '@/api/app_client/types'
import Img from '@/assets/react.svg'
export default function AppClientItem(props: { app: AppClient }) {
    const { app } = props

    return (
        <div className="app_item">
            <img src={Img} alt="" className="app_logo" />
            <div className="app_info">
                <div className="app_name">
                    {app.name}
                </div>
                <div className="app_notes">
                    {app.notes}
                </div>
            </div>
        </div>
    )
}
