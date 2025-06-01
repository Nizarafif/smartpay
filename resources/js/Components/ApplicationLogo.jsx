export default function ApplicationLogo(props) {
    return (
        <img
          {...props}
          src="/assets/Logo.png"  // pastikan kamu punya file ini di public/assets
          alt="Logo"
        />
    );
}
