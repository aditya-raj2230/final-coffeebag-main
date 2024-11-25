import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/img-2.jpg';
import img3 from '../assets/img-3.jpg';
import img4 from '../assets/img-4.jpg';
import img5 from '../assets/img-5.jpg';
import img6 from '../assets/img-6.jpg';
import img7 from '../assets/img-7.jpg';
import img8 from '../assets/img-8.jpg';
import img9 from '../assets/img-9.jpg';

export default function InkfishScroll() {
  const mainContainer = useRef(null);
  const contentContainer = useRef(null);
  const dragHandle = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const container = contentContainer.current;
    const sections = gsap.utils.toArray(container.children);
    const numSections = sections.length;
    const dragTrack = mainContainer.current.querySelector('.drag-track');

    const sectionWidth = window.innerWidth;
    const totalWidth = sectionWidth * numSections;

    // Set up the container and sections
    gsap.set(container, { width: totalWidth, display: 'flex', x: 0 });
    gsap.set(dragHandle.current, { x: 0 });
    sections.forEach((section) =>
      gsap.set(section, { width: sectionWidth, flexShrink: 0 })
    );

    // Create draggable behavior with increased sensitivity
    Draggable.create(dragHandle.current, {
      type: 'x',
      bounds: {
        minX: 0,
        maxX: dragTrack.offsetWidth - dragHandle.current.offsetWidth,
      },
      onDrag: function () {
        const progress = this.x / (dragTrack.offsetWidth - dragHandle.current.offsetWidth);
        const moveX = -(totalWidth - sectionWidth) * progress * 1; // Increased intensity
        gsap.to(container, {
          x: moveX,
          duration: 0.03, // Even faster response
          ease: 'none',
        });
      },
      // Force initial position
      onDragStart: function() {
        if (!this.x) {
          gsap.set(this.target, { x: 0 });
          gsap.set(container, { x: 0 });
        }
      }
    });

    // Force initial positions
    gsap.set(container, { x: 0 });
    gsap.set(dragHandle.current, { x: 0 });

    // Add scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100); // Show after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1 // Trigger when 10% of the target is visible
      }
    );

    // Observe the content container
    if (contentContainer.current) {
      observer.observe(contentContainer.current);
    }

    // Add horizontal scroll handling
    const handleHorizontalScroll = (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const maxScroll = dragTrack.offsetWidth - dragHandle.current.offsetWidth;
      
      // Update drag handle position
      const currentX = gsap.getProperty(dragHandle.current, "x");
      const newX = Math.max(0, Math.min(maxScroll, currentX + delta * 0.2));
      
      // Update both drag handle and content position
      gsap.to(dragHandle.current, { x: newX, duration: 0.5 });
      
      const progress = newX / maxScroll;
      const moveX = -(totalWidth - sectionWidth) * progress;
      gsap.to(container, { x: moveX, duration: 0.5 });
    };

    // Add wheel event listener
    mainContainer.current.addEventListener('wheel', handleHorizontalScroll, { passive: false });

    return () => {
      // Add scroll cleanup
      window.removeEventListener('scroll', handleScroll);
      // Cleanup
      gsap.set(container, { clearProps: 'all' });
      gsap.set(dragHandle.current, { clearProps: 'all' });
      observer.disconnect();
      mainContainer.current.removeEventListener('wheel', handleHorizontalScroll);
    };
  }, []);

  return (
    <div
      ref={mainContainer}
      className="overflow-hidden min-h-screen"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        margin: '0',
        fontFamily: 'Avenir Next, system-ui, Avenir, Helvetica, Arial, sans-serif',
      }}
    >

      <div ref={contentContainer} className="relative h-screen flex">
        <section className="flex flex-col justify-center items-center p-16 bg-black text-white border-r border-gray-700">
          <h1 className="text-5xl max-w-3xl mb-8">
            Beyond the Veil, Threads Woven from the Shadows of Tomorrow is launching soon
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed">
            In a world frayed at the edges, our garments emerge as relics of a darker future...
            <br />
            <br />
            Our designs whisper tales of a forgotten society...
          </p>
        </section>

        <section className="flex flex-col items-center justify-center gap-8 bg-black text-white border-r border-gray-700">
          <img src={img1} alt="Fashion piece 1" className="w-3/4 h-auto shadow-md" />
          <img src={img2} alt="Fashion piece 2" className="w-3/4 h-auto shadow-md" />
          <img src={img3} alt="Fashion piece 3" className="w-3/4 h-auto shadow-md" />
        </section>

        <section className="flex flex-col items-center justify-center gap-8 bg-black text-white border-r border-gray-700">
          <img src={img4} alt="Fashion piece 4" className="w-3/4 h-auto shadow-md" />
          <img src={img5} alt="Fashion piece 5" className="w-3/4 h-auto shadow-md" />
          <img src={img6} alt="Fashion piece 6" className="w-3/4 h-auto shadow-md" />
        </section>

        <section className="flex flex-col justify-center items-center p-16 bg-black text-white border-r border-gray-700">
          <h1 className="text-5xl max-w-3xl mb-8">
            Echoes of Rebellion, Couture Crafted for the Last Stand
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed">
            In the shadows of crumbling skyscrapers...
            <br />
            <br />
            Join the resistance styled in the essence of upheaval...
          </p>
        </section>

        <section className="flex flex-col items-center justify-center gap-8 bg-black text-white">
          <img src={img7} alt="Fashion piece 7" className="w-3/4 h-auto shadow-md" />
          <img src={img8} alt="Fashion piece 8" className="w-3/4 h-auto shadow-md" />
          <img src={img9} alt="Fashion piece 9" className="w-3/4 h-auto shadow-md" />
        </section>
      </div>

      <div
        className={`drag-track fixed bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-gray-700 rounded-full transition-opacity duration-300 opacity-0`}
        style={{
          backgroundColor: '#333',
        }}
      >
        <div
          ref={dragHandle}
          className="absolute left-0 w-[100px] h-[40px] bg-gray-900 text-white font-bold rounded-full cursor-grab flex items-center justify-center shadow-md"
          style={{
            transform: 'translateX(0)',
          }}
        >
          <p>Drag</p>
        </div>
      </div>
    </div>
  );
}
