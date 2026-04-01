import { useEffect, useRef, useState } from "react";

/* ── scroll reveal ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── morphing blob ── */
function MorphBlob({ color, delay = 0, id }) {
  const paths = [
    "M60,-45C72,-28,72,14,58,47C44,80,16,104,-18,104C-52,103,-92,77,-105,43C-118,9,-103,-34,-78,-62C-53,-90,-18,-102,16,-97C50,-92,48,-62,60,-45Z",
    "M55,-38C74,-15,94,18,89,49C84,79,54,107,18,115C-18,123,-60,110,-84,82C-108,54,-115,11,-101,-26C-87,-63,-53,-93,-17,-98C19,-103,36,-61,55,-38Z",
    "M44,-32C63,-12,88,17,88,46C88,76,64,106,31,117C-2,127,-44,117,-72,93C-100,68,-114,29,-107,-8C-100,-45,-72,-79,-39,-90C-6,-101,25,-53,44,-32Z",
    "M60,-45C72,-28,72,14,58,47C44,80,16,104,-18,104C-52,103,-92,77,-105,43C-118,9,-103,-34,-78,-62C-53,-90,-18,-102,16,-97C50,-92,48,-62,60,-45Z",
  ];
  return (
    <svg viewBox="-130 -130 260 260" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={`skblob${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </radialGradient>
      </defs>
      <path fill={`url(#skblob${id})`}>
        <animate
          attributeName="d" dur={`${8 + delay}s`} repeatCount="indefinite"
          values={paths.join(";")} calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
    </svg>
  );
}

/* ── brand SVG icons ── */
const Icons = {
  Python: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
        <stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/>
      </linearGradient>
      <linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
        <stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/>
      </linearGradient>
      <path d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" fill="url(#py1)"/>
      <path d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" fill="url(#py2)"/>
    </svg>
  ),
  Django: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" fill="#092E20"/>
      <path d="M76.3 96.7c-5.6 0-9.4-2.8-9.4-8.7V53.8h-8.7v35c0 11.4 8.1 17.6 18.1 17.6 9.2 0 18.1-6.2 18.1-17.6V53.8h-8.7v34.2c0 5.9-3.8 8.7-9.4 8.7zM47.9 29.2h-8.7v12.7h8.7V29.2zM47.9 53.8h-8.7v51.4h8.7V53.8z" fill="#44B78B"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <g fill="#61DAFB">
        <circle cx="64" cy="64" r="11.4"/>
        <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13-1.2-21.8-9.6-26.5-7.9-4.6-19.9-2.7-31.6 5.3-3.6-2.4-7.4-4.6-11.2-6.5-8.2-3.8-16.3-5.2-22.9-2.5-7.8 3.2-11.9 12.4-11.5 25.8.1 2.3.3 4.7.7 7.2-2.5.7-4.8 1.5-7 2.4-9.2 3.7-14.6 9.4-14.6 16.8s5.3 13 14.5 16.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13 1.2 21.8 9.6 26.5 7.9 4.6 19.9 2.7 31.6-5.3 3.6 2.4 7.4 4.6 11.2 6.5 8.2 3.8 16.3 5.2 22.9 2.5 7.8-3.2 11.9-12.4 11.5-25.8-.1-2.3-.3-4.7-.7-7.2 2.5-.7 4.8-1.5 7-2.4 9.2-3.7 14.6-9.4 14.6-16.8s-5.2-13.2-14.5-16.8z"/>
      </g>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" fill="#E44D26"/>
      <path d="M64 116.8l36.378-10.086 8.559-95.878H64z" fill="#F16529"/>
      <path d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z" fill="#EBEBEB"/>
      <path d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.277-3.092.628-6.978.329-3.692z" fill="#fff"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" fill="#1572B6"/>
      <path d="M64 116.8l36.378-10.086 8.559-95.878H64z" fill="#33A9DC"/>
      <path d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z" fill="#EBEBEB"/>
      <path d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.277-3.092.628-6.978.329-3.692z" fill="#fff"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.408 1.408h125.184v125.185H1.408z" fill="#F7DF1E"/>
      <path d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" fill="#000"/>
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 8A56 56 0 118 64 56.063 56.063 0 0164 8m0-8a64 64 0 1064 64A64 64 0 0064 0z" fill="#7952b3"/>
      <path d="M51.9 96.8H35.3V31.2h17.7c10.4 0 17 5.2 17 13.5a12.35 12.35 0 01-9.8 12.3v.3c7.8 1.2 12.5 6.5 12.5 14.1 0 9.6-7.3 15.4-20.8 15.4zm-1.5-57.2H45v19h4.4c7.1 0 11-3.2 11-9.5s-3.6-9.5-10-9.5zm1.1 26.9H45v22.1h6.5c7.5 0 11.5-3.5 11.5-11.1s-4.1-11-11.5-11zM80 96.8V31.2h10v65.6z" fill="#7952b3"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M64.004 25.602C45.317 25.602 34.91 34.998 32 53.794c4.638-6.21 10.034-8.543 16.188-7.004 3.52.878 6.036 3.428 8.823 6.252C61.37 57.484 66.872 63.056 78.942 63.056c18.688 0 29.095-9.396 32.004-28.192-4.638 6.21-10.034 8.543-16.188 7.004-3.52-.878-6.036-3.428-8.823-6.252-4.36-4.442-9.862-10.014-21.931-10.014zM32 63.056C13.313 63.056 2.906 72.452 0 91.248c4.638-6.21 10.034-8.543 16.188-7.004 3.52.878 6.036 3.428 8.822 6.252 4.361 4.442 9.863 10.014 21.932 10.014 18.688 0 29.095-9.396 32.004-28.192-4.638 6.21-10.034 8.543-16.188 7.004-3.52-.878-6.036-3.428-8.822-6.252C49.576 68.628 44.07 63.056 32 63.056z" fill="#38BDF8"/>
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341-1.273.537-3.305.552-3.513 2.147.7.733.809 1.829 1.365 2.731 1.07 1.73 2.876 4.052 4.488 5.268 1.762 1.33 3.572 2.751 5.465 3.902 3.358 2.047 7.107 3.217 10.34 5.268 1.906 1.21 3.799 2.733 5.658 4.097.92.675 1.537 1.724 2.732 2.147v-.194c-.628-.8-.79-1.898-1.366-2.733l-2.537-2.537c-2.48-3.292-5.629-6.184-8.976-8.585-2.669-1.916-8.642-4.504-9.755-7.609l-.195-.195c1.892-.214 4.107-.898 5.854-1.367 2.934-.786 5.556-.583 8.585-1.365l4.097-1.171v-.78c-1.531-1.571-2.623-3.651-4.292-5.073-4.37-3.72-9.138-7.437-14.048-10.537-2.724-1.718-6.089-2.835-8.976-4.292-.971-.491-2.677-.746-3.318-1.562-1.517-1.932-2.342-4.382-3.511-6.633-2.449-4.717-4.854-9.868-7.024-14.831-1.48-3.384-2.447-6.72-4.293-9.756-8.86-14.567-18.396-23.358-33.169-32-3.144-1.838-6.929-2.563-10.929-3.512-2.145-.129-4.292-.26-6.437-.391-1.311-.546-2.674-2.149-3.902-2.927-4.894-3.092-17.448-9.817-21.072-.975-2.289 5.581 3.421 11.025 5.462 13.854 1.434 1.982 3.269 4.207 4.293 6.437.675 1.467.79 2.938 1.367 4.489 1.417 3.822 2.652 7.98 4.487 11.511 1.418 2.733 3.014 5.604 4.878 8-1.101 1.537-1.101 3.926-1.757 5.854-2.75 8.683-.771 19.457 2.146 25.853 1.29 2.786 4.565 8.767 8.975 6.634 3.85-1.862 2.994-6.476 4.099-10.732.249-.958.097-1.666.584-2.341v.194l3.513 7.024c2.6 4.187 7.212 8.562 11.122 11.514 2.027 1.531 3.623 4.177 6.244 5.073v-.196h-.195c-.508-.791-1.288-1.121-1.95-1.756-1.523-1.521-3.214-3.408-4.489-5.073-3.556-4.765-6.7-9.979-9.562-15.415-1.369-2.621-2.557-5.509-3.709-8.196-.444-1.03-.438-2.589-1.364-3.122-1.263 1.958-3.122 3.542-4.099 5.854-1.561 3.696-1.762 8.204-2.341 12.878-.342.122-.19.038-.391.194-2.718-.655-3.672-3.452-4.683-5.853-2.554-6.07-3.029-15.842-.781-22.829.582-1.809 3.21-7.501 2.146-9.172-.508-1.666-2.184-2.63-3.121-3.903-1.161-1.574-2.319-3.646-3.124-5.465-2.09-4.731-3.066-10.044-5.267-14.833-1.053-2.284-2.834-4.587-4.293-6.634-1.617-2.253-3.429-3.912-4.683-6.635-.446-.968-1.051-2.518-.39-3.513.21-.671.508-.951 1.171-1.17 1.132-.873 4.284.29 5.462.779 3.129 1.29 5.74 2.52 8.391 4.292 1.271.844 2.559 2.475 4.097 2.927h1.756c2.747.617 5.824.188 8.391.975 4.536 1.394 8.601 3.567 12.293 5.855 11.246 7.102 20.442 17.22 26.635 29.147 1.008 1.933 1.443 3.786 2.341 5.854 1.798 4.153 4.064 8.426 5.853 12.488 1.786 4.055 3.526 8.141 6.05 11.513 1.327 1.772 6.451 2.723 8.78 3.708 1.632.689 4.307 1.409 5.854 2.34 3.017 1.826 5.963 4.005 8.781 6.05 1.41 1.02 5.748 3.196 5.95 4.879z" fill="#00618A"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.85 9.861-7.637 3.758-6.381-13.924 2.85-14.771-1.842-14.771-1.842 14.6-21.683 20.7-49.218 15.44-55.978C101.944 3.911 77.802 14.7 77.802 14.7l-.06.016c-1.603-.335-3.3-.52-5.133-.556-3.48-.063-6.12.914-8.104 2.396L64 17c-.535.404-1.074.806-1.624 1.196a55.37 55.37 0 00-1.46-1.21c0 0-24.143-10.788-38.47 5.969-5.26 6.76.84 34.295 15.44 55.978 0 0-.848 4.692-14.771 1.842-6.103-1.256-2.433 3.531 3.758 6.381 2.876 1.336 7.771 2.108 11.513 1.938l1.235-.108c4.866-1.059 4.631-.1 5.416 6.433 0 0 .14 5.33-.36 6.916-.636 2.014-2.003 4.7-2.69 7.227-.616 2.222.094 3.5 3.248 3.27 7.1-.513 10.7-7.55 10.7-7.55s.81 2.22 2.04 3.556c1.483 1.602 3.528 2.14 5.62 1.73 0 0 6.96 1.01 9.51-5.74 1.79-4.77 2.04-5.4 2.04-5.4s3.6 7.037 10.7 7.55c3.154.23 3.864-1.048 3.248-3.27-.687-2.527-2.054-5.213-2.69-7.227-.5-1.585-.36-6.916-.36-6.916z" fill="#336791"/>
      <path d="M44.34 41.55c-.924.026-1.77.114-2.535.263-7.05 1.353-8.28 5.23-8.28 5.23l7.91-.25 7.37-.4s-1.494-4.94-4.465-4.843zm42.02 0c2.97.097 4.465 4.843 4.465 4.843l-7.37.4-7.91.25s1.23-3.877 8.28-5.23c.765-.15 1.61-.237 2.535-.263z" fill="#fff"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M124.742 58.378L69.625 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.685 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993L87.4 55.683c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.588 48.217v34.645a9.574 9.574 0 012.559 1.805c3.779 3.779 3.779 9.901 0 13.683-3.779 3.775-9.904 3.775-13.679 0-3.778-3.782-3.778-9.904 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.48 20.143 3.256 58.378c-3.177 3.18-3.177 8.32 0 11.497l55.126 55.119c3.173 3.174 8.325 3.174 11.503 0l54.858-54.858c3.176-3.176 3.176-8.319-.001-11.758z" fill="#F34F29"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" fill="#f5f0ff"/>
    </svg>
  ),
  VSCode: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M90.767 127.126a10.369 10.369 0 007.975-1.301l23.098-11.6a10.561 10.561 0 005.16-9.108V22.883a10.561 10.561 0 00-5.16-9.108L98.742 2.176a10.369 10.369 0 00-10.76.29 10.4 10.4 0 00-1.21.978L40.717 48.2 18.8 32.024a6.928 6.928 0 00-8.84.322l-7.47 6.8a6.946 6.946 0 00-.006 10.28L23.749 64 2.484 79.573a6.946 6.946 0 00.007 10.28l7.469 6.8a6.928 6.928 0 008.84.322L40.717 80.8l46.054 44.854a10.4 10.4 0 001.996 1.472z" fill="#007ACC"/>
    </svg>
  ),
  "MVT Architecture": (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="112" height="112" rx="16" fill="#092E20"/>
      <rect x="20" y="20" width="40" height="36" rx="6" fill="#44B78B" opacity="0.9"/>
      <rect x="68" y="20" width="40" height="36" rx="6" fill="#44B78B" opacity="0.6"/>
      <rect x="20" y="72" width="88" height="36" rx="6" fill="#44B78B" opacity="0.4"/>
      <text x="25" y="43" fontFamily="monospace" fontSize="11" fill="#fff" fontWeight="bold">M</text>
      <text x="73" y="43" fontFamily="monospace" fontSize="11" fill="#fff" fontWeight="bold">V</text>
      <text x="25" y="95" fontFamily="monospace" fontSize="10" fill="#fff" fontWeight="bold">Template</text>
    </svg>
  ),
  "Django ORM": (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="120" height="120" rx="16" fill="#092E20"/>
      <ellipse cx="64" cy="40" rx="44" ry="16" fill="none" stroke="#44B78B" strokeWidth="3"/>
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#44B78B" strokeWidth="3" opacity="0.7"/>
      <ellipse cx="64" cy="88" rx="44" ry="16" fill="none" stroke="#44B78B" strokeWidth="3" opacity="0.4"/>
      <line x1="20" y1="40" x2="20" y2="88" stroke="#44B78B" strokeWidth="3"/>
      <line x1="108" y1="40" x2="108" y2="88" stroke="#44B78B" strokeWidth="3"/>
    </svg>
  ),
  "Responsive Design": (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="18" width="76" height="56" rx="6" fill="none" stroke="#c084fc" strokeWidth="3"/>
      <rect x="84" y="30" width="40" height="44" rx="5" fill="none" stroke="#c084fc" strokeWidth="3" opacity="0.7"/>
      <rect x="46" y="84" width="36" height="26" rx="5" fill="none" stroke="#c084fc" strokeWidth="3" opacity="0.5"/>
      <line x1="42" y1="74" x2="42" y2="84" stroke="#c084fc" strokeWidth="2" opacity="0.4"/>
      <line x1="64" y1="74" x2="64" y2="84" stroke="#c084fc" strokeWidth="2" opacity="0.4"/>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 8L128 120H0L64 8z" fill="#f5f0ff"/>
    </svg>
  ),
  "Role-based Access": (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="120" height="120" rx="16" fill="#1a0a1e"/>
      <circle cx="64" cy="36" r="18" fill="none" stroke="#f43f6e" strokeWidth="3"/>
      <path d="M30 100c0-18.8 15.2-34 34-34s34 15.2 34 34" fill="none" stroke="#f43f6e" strokeWidth="3"/>
      <rect x="72" y="60" width="24" height="18" rx="4" fill="#f43f6e" opacity="0.2"/>
      <path d="M84 60v-6a6 6 0 00-12 0v6" fill="none" stroke="#fb7aa0" strokeWidth="2.5"/>
      <rect x="76" y="64" width="16" height="10" rx="3" fill="#fb7aa0"/>
    </svg>
  ),
};

const techGrid = [
  { name: "Python",            category: "backend",  brand: "#306998" },
  { name: "Django",            category: "backend",  brand: "#44B78B" },
  { name: "Django ORM",        category: "backend",  brand: "#44B78B" },
  { name: "MVT Architecture",  category: "backend",  brand: "#44B78B" },
  { name: "Role-based Access", category: "backend",  brand: "#f43f6e" },
  { name: "HTML",              category: "frontend", brand: "#E44D26" },
  { name: "CSS",               category: "frontend", brand: "#1572B6" },
  { name: "JavaScript",        category: "frontend", brand: "#F7DF1E" },
  { name: "React",             category: "frontend", brand: "#61DAFB" },
  { name: "Tailwind CSS",      category: "frontend", brand: "#38BDF8" },
  { name: "Bootstrap",         category: "frontend", brand: "#7952b3" },
  { name: "Responsive Design", category: "frontend", brand: "#c084fc" },
  { name: "MySQL",             category: "database", brand: "#00618A" },
  { name: "PostgreSQL",        category: "database", brand: "#336791" },
  { name: "Vercel",            category: "tools",    brand: "#f5f0ff" },
  { name: "Git",               category: "tools",    brand: "#F34F29" },
  { name: "GitHub",            category: "tools",    brand: "#f5f0ff" },
  { name: "VSCode",            category: "tools",    brand: "#007ACC" },
];

const categoryMeta = {
  backend:  { label: "Backend",         color: "#ff3b6b", glow: "rgba(255,59,107,0.15)",  border: "rgba(255,59,107,0.3)"  },
  frontend: { label: "Frontend",        color: "#c084fc", glow: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.3)" },
  database: { label: "Databases",       color: "#00f5d4", glow: "rgba(0,245,212,0.1)",    border: "rgba(0,245,212,0.28)"  },
  tools:    { label: "Tools & Workflow", color: "#86efac", glow: "rgba(134,239,172,0.1)",  border: "rgba(134,239,172,0.28)"},
};

const filters = ["all", "backend", "frontend", "database", "tools"];

/* ── floating dot particle ── */
function FloatDot({ style }) {
  return <span className="sk-float-dot" style={style} />;
}

export default function Skills() {
  const [secRef, secVisible] = useReveal(0.08);
  const [gridRef, gridVisible] = useReveal(0.08);
  const [active, setActive] = useState("all");
  const [animKey, setAnimKey] = useState(0);

  const handleFilter = (f) => {
    if (f === active) return;
    setActive(f);
    setAnimKey(k => k + 1);
  };

  const filtered = active === "all" ? techGrid : techGrid.filter(t => t.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        #skills {
          --rose:   #ff3b6b;
          --violet: #9b5de5;
          --cyan:   #00f5d4;
          --ink:    #f5f0ff;
          --ink2:   #8b7da8;
          --ink3:   #4a3f62;
          --bg:     #07050f;
          --ff-head:'Bebas Neue', sans-serif;
          --ff-body:'Space Grotesk', sans-serif;
          --ff-mono:'Share Tech Mono', monospace;
          position: relative;
          padding: 110px 0 120px;
          background: var(--bg);
          overflow: hidden;
          font-family: var(--ff-body);
          color: var(--ink);
        }

        /* subtle grid */
        #skills::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(155,93,229,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,93,229,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* ── blobs: pointer-events:none + z-index:0 so grid cards always clickable ── */
        .sk-blob {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }
        /* Top-right: clear of header text, pulled in from edge */
        .sk-blob-a {
          width: 380px; height: 380px;
          top: 30px; right: -70px;
          animation: sk-orbit 30s linear infinite;
        }
        /* Bottom-left: pulled in so it's visible but not covering legend */
        .sk-blob-b {
          width: 320px; height: 320px;
          bottom: 70px; left: -70px;
          animation: sk-orbit 24s linear infinite reverse;
        }
        @keyframes sk-orbit {
          0%   { transform: rotate(0deg)   translateX(18px) rotate(0deg);   }
          100% { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }

        /* floating dots */
        .sk-float-dot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          animation: sk-float linear infinite;
        }
        @keyframes sk-float {
          0%   { transform: translateY(0)    rotate(0deg);   opacity: 0;   }
          10%  { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }

        /* All actual content sits above blobs */
        .sk-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 6%;
          position: relative;
          z-index: 2;
        }

        /* ── header ── */
        .sk-eyebrow {
          font-family: var(--ff-mono);
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--violet);
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .sk-eyebrow-line {
          height: 1px; width: 36px;
          background: rgba(155,93,229,0.4);
        }

        .sk-heading {
          font-family: var(--ff-head);
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
          color: var(--ink);
        }
        .sk-heading-accent {
          background: linear-gradient(90deg, var(--violet), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sk-subtitle {
          font-family: 'Crimson Pro', serif;
          font-style: italic;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: var(--ink2);
          font-weight: 300;
          margin-bottom: 52px;
        }

        .sk-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, var(--violet), var(--cyan));
          margin-bottom: 52px;
          border-radius: 2px;
        }

        /* ── filter strip ── */
        .sk-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 48px;
          position: relative;
        }

        .sk-filter-btn {
          font-family: var(--ff-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 4px;
          background: transparent;
          border: 1px solid rgba(155,93,229,0.14);
          color: var(--ink3);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .sk-filter-btn:hover {
          border-color: rgba(155,93,229,0.32);
          color: var(--ink2);
        }
        .sk-filter-btn.active {
          border-color: var(--active-border);
          color: var(--active-color);
          background: var(--active-bg);
          box-shadow: 0 0 20px var(--active-glow);
        }

        /* ── tech grid ── */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(126px, 1fr));
          gap: 14px;
        }

        .sk-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 11px;
          padding: 22px 12px 18px;
          border-radius: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(155,93,229,0.1);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          /* Cards are z-index 1 — above blobs (0) but below nothing */
          z-index: 1;
        }
        .sk-card.visible {
          animation: sk-card-in 0.45s ease forwards;
        }
        @keyframes sk-card-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .sk-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--card-glow) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sk-card::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--card-color), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sk-card:hover {
          transform: translateY(-7px) scale(1.03);
          border-color: rgba(155,93,229,0.25);
          box-shadow: 0 18px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(155,93,229,0.1);
        }
        .sk-card:hover::before { opacity: 1; }
        .sk-card:hover::after  { opacity: 1; }
        .sk-card:hover .sk-icon-wrap { transform: scale(1.1) rotate(-4deg); }
        .sk-card:hover .sk-name      { color: var(--ink); }

        .sk-cat-dot {
          position: absolute;
          top: 10px; right: 10px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--card-color);
          box-shadow: 0 0 6px var(--card-color);
        }

        .sk-icon-wrap {
          width: 54px; height: 54px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          padding: 9px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
          position: relative; z-index: 1;
        }
        .sk-icon-wrap svg { width: 100%; height: 100%; }

        .sk-name {
          font-family: var(--ff-body);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--ink2);
          text-align: center;
          line-height: 1.3;
          transition: color 0.25s;
          position: relative; z-index: 1;
        }

        /* ── category legend ── */
        .sk-legend {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(155,93,229,0.1);
          position: relative;
          z-index: 2;
        }
        .sk-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--ff-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink3);
          transition: color 0.2s;
          cursor: pointer;
        }
        .sk-legend-item:hover { color: var(--ink2); }
        .sk-legend-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--dot-color);
        }

        /* ── count badge ── */
        .sk-count {
          font-family: var(--ff-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--ink3);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sk-count-num {
          color: var(--cyan);
          font-size: 0.72rem;
        }

        /* ── responsive ── */
        @media (max-width: 768px) {
          .sk-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
          .sk-icon-wrap { width: 46px; height: 46px; }
          .sk-name { font-size: 0.7rem; }
          .sk-filters { gap: 6px; }
          .sk-filter-btn { font-size: 0.6rem; padding: 7px 12px; }
          /* shrink blobs on tablet */
          .sk-blob-a { width: 280px; height: 280px; right: -60px; }
          .sk-blob-b { width: 240px; height: 240px; left: -60px; }
        }
        @media (max-width: 480px) {
          #skills { padding: 80px 0 90px; }
          .sk-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .sk-card { padding: 16px 8px 14px; }
          .sk-icon-wrap { width: 40px; height: 40px; padding: 7px; }
          .sk-name { font-size: 0.65rem; }
          .sk-legend { gap: 14px; }
          /* hide blobs on mobile to keep UI clean */
          .sk-blob-a, .sk-blob-b { display: none; }
        }
      `}</style>

      <section id="skills" ref={secRef}>

        {/* ── blob top-right: header stays well to the left, blob is decorative ── */}
        <div className="sk-blob sk-blob-a">
          <MorphBlob color="#00f5d4" delay={2} id="a" />
        </div>

        {/* ── blob bottom-left: below the legend, partially off-screen ── */}
        <div className="sk-blob sk-blob-b">
          <MorphBlob color="#9b5de5" delay={5} id="b" />
        </div>

        {/* floating particles — z-index:0, no interference */}
        {[...Array(8)].map((_, i) => (
          <FloatDot
            key={i}
            style={{
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              left: `${10 + i * 11}%`,
              bottom: `${8 + (i % 4) * 12}%`,
              background: ["#ff3b6b","#9b5de5","#00f5d4","#c084fc","#ff3b6b","#9b5de5","#00f5d4","#c084fc"][i],
              animationDuration: `${6 + i * 1.4}s`,
              animationDelay: `${i * 0.8}s`,
              opacity: 0.4,
            }}
          />
        ))}

        <div className="sk-container">

          {/* ── header ── */}
          <div className="sk-eyebrow" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <span className="sk-eyebrow-line" />
            Technical Skills
            <span className="sk-eyebrow-line" />
          </div>

          <h2 className="sk-heading" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease",
          }}>
            What I <span className="sk-heading-accent">work with</span>
          </h2>

          <p className="sk-subtitle" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
          }}>
            The stack I've shipped real projects with — no buzzword fluff.
          </p>

          <div className="sk-divider" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease",
          }} />

          {/* ── filter strip ── */}
          <div className="sk-filters" style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "none" : "translateY(12px)",
            transition: "opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease",
          }}>
            {filters.map((f) => {
              const meta  = categoryMeta[f];
              const isAll = f === "all";
              const isActive = active === f;
              return (
                <button
                  key={f}
                  className={`sk-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleFilter(f)}
                  style={isActive ? {
                    "--active-color":  isAll ? "#00f5d4"    : meta.color,
                    "--active-border": isAll ? "rgba(0,245,212,0.4)" : meta.border,
                    "--active-bg":     isAll ? "rgba(0,245,212,0.07)" : meta.glow,
                    "--active-glow":   isAll ? "rgba(0,245,212,0.1)" : meta.glow,
                  } : {}}
                >
                  {isAll ? "All" : meta.label}
                </button>
              );
            })}
          </div>

          {/* count */}
          <div className="sk-count">
            <span className="sk-count-num">{filtered.length}</span>
            <span>technologies</span>
            {active !== "all" && (
              <span>in <span style={{ color: categoryMeta[active]?.color }}>{categoryMeta[active]?.label}</span></span>
            )}
          </div>

          {/* ── tech grid ── */}
          <div className="sk-grid" ref={gridRef} key={animKey}>
            {filtered.map((tech, i) => {
              const meta = categoryMeta[tech.category];
              const icon = Icons[tech.name] || null;
              return (
                <div
                  key={tech.name}
                  className={`sk-card ${gridVisible ? "visible" : ""}`}
                  style={{
                    "--card-color": meta.color,
                    "--card-glow":  meta.glow,
                    animationDelay: `${i * 0.038}s`,
                  }}
                >
                  <span className="sk-cat-dot" />
                  <div
                    className="sk-icon-wrap"
                    style={{
                      background: `${tech.brand}14`,
                      border: `1px solid ${tech.brand}28`,
                    }}
                  >
                    {icon || (
                      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="6" width="52" height="52" rx="10"
                          fill={`${tech.brand}18`} stroke={tech.brand} strokeWidth="2"/>
                        <text x="32" y="40" textAnchor="middle" fontSize="22" fontWeight="bold"
                          fill={tech.brand} fontFamily="monospace">
                          {tech.name.charAt(0)}
                        </text>
                      </svg>
                    )}
                  </div>
                  <span className="sk-name">{tech.name}</span>
                </div>
              );
            })}
          </div>

          {/* ── legend ── */}
          <div className="sk-legend" style={{
            opacity: secVisible ? 1 : 0,
            transition: "opacity 0.7s 0.5s ease",
          }}>
            {Object.entries(categoryMeta).map(([key, val]) => (
              <div
                key={key}
                className="sk-legend-item"
                onClick={() => handleFilter(key)}
                style={{ "--dot-color": val.color }}
              >
                <span className="sk-legend-dot" style={{ background: val.color }} />
                {val.label}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}