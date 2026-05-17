// Crops vrise-logo.svg (1024.5×576 viewBox) to the logo region (x:80-820, y:140-440)
// Scale: 64/300 = 0.213 → img height 123px, container 158×64px
const VriseLogo = () => (
  <div
    style={{
      width: 158,
      height: 64,
      overflow: "hidden",
      position: "relative",
      flexShrink: 0,
    }}
  >
    <img
      src="/images/vrise-logo.svg"
      alt="VRISE Global"
      style={{
        position: "absolute",
        height: 123,
        width: "auto",
        top: -30,
        left: -17,
      }}
    />
  </div>
);

export default VriseLogo;
