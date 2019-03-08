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
      //const {map} = this.context
      // console.log(this.layer.scene.config);
      // console.log(toProps.scene)
      // this.layer.scene.config = toProps.scene;
      this.layer.scene.updateConfig({ rebuild: true })
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
