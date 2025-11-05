import Layout from '../../components/layout/Layout';

export default function TestAnimations() {
  return (
    <Layout>
      {/* Test Banner */}
      <section className="banner-area background-img position-relative z-1 py-120" style={{backgroundImage: 'url(/assets/images/thumbs/banner-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h6 className="banner-subtitle tw-text-xl text-uppercase text-white tw-mb-9">Animation Test Page</h6>
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10 tw-char-animation">Character Animation Test</h1>
                <p className="tw-text-lg text-white tw-mb-10">This page tests if animations are working correctly in Next.js</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Fade Animations */}
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="text-center tw-mb-14 tw_fade_anim" data-delay=".3">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Fade Animation Test</h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">This Should Fade In From Bottom</h2>
                <p className="tw-text-lg">If you can see this text animating, the animations are working correctly!</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="tw-p-6 bg-white tw-rounded-lg tw-mb-7 tw_fade_anim" data-delay=".3">
                <h4 className="tw-text-xl fw-semibold tw-mb-4">Test Card 1</h4>
                <p>This card should fade in with a 0.3s delay</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="tw-p-6 bg-white tw-rounded-lg tw-mb-7 tw_fade_anim" data-delay=".5">
                <h4 className="tw-text-xl fw-semibold tw-mb-4">Test Card 2</h4>
                <p>This card should fade in with a 0.5s delay</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="tw-p-6 bg-white tw-rounded-lg tw-mb-7 tw_fade_anim" data-delay=".7">
                <h4 className="tw-text-xl fw-semibold tw-mb-4">Test Card 3</h4>
                <p>This card should fade in with a 0.7s delay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Character Animation */}
      <section className="py-120 bg-neutral-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="text-center">
                <h2 className="tw-text-29 fw-normal tw-mb-7 tw-char-animation">Character by Character Animation</h2>
                <h3 className="tw-text-xl fw-normal tw-mb-7 tw-char-animation">Each Letter Should Animate Individually</h3>
                <p className="tw-text-lg tw_fade_anim" data-delay=".5">And this paragraph should fade in after the character animations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Status */}
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="text-center tw_fade_anim">
                <h3 className="tw-text-xl fw-semibold tw-mb-4">Animation Status Check</h3>
                <div id="animation-status" className="tw-p-4 tw-rounded-lg bg-neutral-100">
                  <p>Loading animation status...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple test script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Simple test function
          setTimeout(function() {
            window.testScrolling = function() {
              console.log('=== SCROLL TEST ===');
              const elements = document.querySelectorAll('.tw-char-animation');
              elements.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const triggerPoint = windowHeight * 0.95;
                console.log('Element ' + i + ': top=' + Math.round(rect.top) + ', trigger at=' + Math.round(triggerPoint) + ', should trigger=' + (rect.top <= triggerPoint));
              });
              if (window.ScrollTrigger) {
                console.log('ScrollTrigger instances:', window.ScrollTrigger.getAll().length);
                window.ScrollTrigger.refresh();
                console.log('ScrollTrigger refreshed');
              }
            };
            console.log('Test function ready. Run: window.testScrolling()');
          }, 2000);

          function updateStatusDiv() {
            const statusDiv = document.getElementById('animation-status');
            if (statusDiv) {
                const gsap = window.gsap;
                const ScrollTrigger = window.ScrollTrigger;

                let status = '<h4>Animation Status:</h4><ul>';
                status += '<li>GSAP: ' + (gsap ? '✅' : '❌') + '</li>';
                status += '<li>ScrollTrigger: ' + (ScrollTrigger ? '✅' : '❌') + '</li>';
                status += '<li>Character elements: ' + document.querySelectorAll('.tw-char-animation').length + '</li>';

                if (ScrollTrigger) {
                  status += '<li>ScrollTrigger instances: ' + ScrollTrigger.getAll().length + '</li>';
                }

                status += '</ul>';
                status += '<button onclick="window.testScrolling()" style="padding: 5px 10px;">Test Scroll Positions</button>';
                statusDiv.innerHTML = status;
              }


          // Update status div after scripts load
          setTimeout(updateStatusDiv, 3000);
        `
      }} />
    </Layout>
  );
}
