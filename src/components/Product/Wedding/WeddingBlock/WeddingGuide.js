import GuideToChoose from "../../Shared/GuideToChoose";
import withFetch from "../../../_common/HOC/WithFetch";
import api from "../../../../config/api";

export default withFetch(api.weddingRing.getGuide)(GuideToChoose);
