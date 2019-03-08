import Tangram from 'tangram';
import { MapLayer, withLeaflet } from 'react-leaflet';
import PropTypes from 'prop-types';

class TangramLayer extends MapLayer {

   createLeafletElement(props) {
      const { map } = props.leaflet || this.context;

      this.layer = Tangram.leafletLayer({
         scene: props.scene,
         events: {
            click: props.onMapClick,
            hover: props.onMapHover
         }

      }).addTo(map)
      return this.layer;
   }

   updateLeafletElement(fromProps, toProps) {

      this.layer.scene.updateConfig()
   }

   componentWillUnmount() {
      const {map} = this.context
      this.layer.removeFrom(map);
   }
}

TangramLayer.propTypes = {
  scene: PropTypes.object.isRequired,
  onMapClick: PropTypes.func,
  onMapHover: PropTypes.func,
};

export default withLeaflet(TangramLayer)
