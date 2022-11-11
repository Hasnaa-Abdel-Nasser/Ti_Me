
console.log(header)
class Carousel {
    constructor(el) {
      this.el = el;
      this.carouselOptions = ['previous', 'next'];
      this.carouselData = [
        {
          'id': '1',
          'src': '../images/card/Asia.jpg',
          'back': '../images/Asia.jpg',
          'name': 'Asia'
        },
        {
          'id': '2',
          'src':  '../images/card/Africa.jpg',
          'back': '../images/Africa.jpg',
          'name': 'Africa'

        },
        {
          'id': '3',
          'src':  '../images/card/America.jpg',
          'back': '../images/America.jpg',
          'name': 'America'
        },
        {
            'id': '4',
            'src':  '../images/card/Atlantic.jpg',
            'back': '../images/Atlantic.jpg',
            'name': 'Atlantic',
        },
        {
          'id': '5',
          'src':  '../images/card/Australia.jpg',
          'back': '../images/Australia.jpg',
          'name': 'Australia',
        },
        {
            'id': '6',
            'src':  '../images/card/Europe.jpg',
            'back': '../images/Europe.jpg',
            'name': 'Europe',
        },
        {
          'id': '7',
          'src':  '../images/card/Pacific.jpg',
          'back': '../images/Pacific.jpg',
          'name': 'Pacific',
        },
      ];
      this.carouselInView = [1, 2, 3 , 4 , 5 , 6 , 7 ];
    }
    
    mounted() {
      this.setupCarousel();
    }
  
    // Build carousel html
    setupCarousel() {
      const container = document.createElement('div');
      const controls = document.createElement('div');
      
      // Add container for carousel items and controls
      this.el.append(container, controls);
      container.className = 'carousel-container';
      controls.className = 'carousel-controls';
  
      // Take dataset array and append items to container
      this.carouselData.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        container.append(carouselItem);
        carouselItem.style.cssText=`background: linear-gradient(rgba(1, 1, 1, 0.119), rgba(1, 1, 1, 0.119)),url(${item.src}); background-size: 100% 100%;`;
        carouselItem.innerHTML=`<i class="fa-solid fa-bookmark" id="book"></i>
                                <p>${item.name}</p>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>`;
        // Add item attributes
        
        carouselItem.className = `carousel-item carousel-item-${index + 1}`;
        // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
        carouselItem.setAttribute('data-index', `${index + 1}`);
      });
      this.carouselOptions.forEach((option) => {
        const btn = document.createElement('button');  
        // Add accessibilty spans to button

        // Add button attributes
        btn.className = `carousel-control carousel-control-${option}`;
        btn.setAttribute('data-name', option);
        if(option == 'next') btn.innerHTML = `<i class="fa-solid fa-arrow-right-long"></i>`;
        else  btn.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i>`;
        // Add carousel control options
        controls.append(btn);
      });
  
      // After rendering carousel to our DOM, setup carousel controls' event listeners
      this.setControls([...controls.children]);
  
      // Set container property
      this.carouselContainer = container;
      
    }
  
    setControls(controls) {
      controls.forEach(control => {
        control.onclick = (event) => {
          // Manage control actions, update our carousel data first then with a callback update our DOM
          this.controlManager(control.dataset.name);
        };
        control.onkeydown = (event) => {
          if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
            this.controlManager('next');
          }
          else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
            this.controlManager('previous');
          }
        }
      });
    }
    controlManager(control) {
      if (control === 'previous') return this.previous();
      if (control === 'next') return this.next();
    
      return;
    }
    previous() {
        const Name = document.getElementById('country');
        const ind = document.querySelector('.carousel-item').getAttribute('data-index');
        Name.innerHTML= this.carouselData[7+(+ind)-2]['name'].toUpperCase();
        const explore = document.getElementById('explore');
        explore.setAttribute('data' , this.carouselData[7+(+ind)-2]['name']);
        // Update order of items in data array to be shown in carousel
      this.carouselData.unshift(this.carouselData.pop());
      // Push the first item to the end of the array so that the previous item is front and center
      this.carouselInView.push(this.carouselInView.shift());
      header.style.cssText=`background: linear-gradient(rgba(1, 1, 1, 0.329), rgba(1, 1, 1, 0.329)),url(${this.carouselData[0]['back']});  background-size: 100% 100%;`;

      // Update the css class for each carousel item in view
      this.carouselInView.forEach((item, index) => {
        this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });
      // Using the first 5 items in data array update content of carousel items in view
      this.carouselData.slice(0, 7).forEach((data, index) => {
        document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });
    }
  
    next() {
        const Name = document.getElementById('country');
        const ind = document.querySelector('.carousel-item').getAttribute('data-index');
        Name.innerHTML= this.carouselData[(+ind)]['name'].toUpperCase();
        const explore = document.getElementById('explore');
        explore.setAttribute('data' , this.carouselData[(+ind)]['name']);
        // Update order of items in data array to be shown in carousel
      this.carouselData.push(this.carouselData.shift());
      header.style.cssText=`background: linear-gradient(rgba(1, 1, 1, 0.329), rgba(1, 1, 1, 0.329)),url(${this.carouselData[0]['back']});  background-size: 100% 100%;`;

      // Take the last item and add it to the beginning of the array so that the next item is front and center
      this.carouselInView.unshift(this.carouselInView.pop());
  
      // Update the css class for each carousel item in view
      this.carouselInView.forEach((item, index) => {
        this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
      });
  
      // Using the first 5 items in data array update content of carousel items in view
      this.carouselData.slice(0, 7).forEach((data, index) => {
        document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });

    }
}

  // Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
  const el = document.querySelector('.carousel');
  
  // Create a new carousel object
  const exampleCarousel = new Carousel(el);
  
  // Setup carousel and methods
  exampleCarousel.mounted();
