export const members = [
  {
    name: 'Cortis',
    images: [
      '/images/group/group1.jpg',
      '/images/group/group2.jpg',
      '/images/group/group3.jpg',
      '/images/group/group4.jpg',
      '/images/group/group5.jpg',
      '/images/group/group6.jpg',
      '/images/group/group7.jpg',
      '/images/group/group8.jpg',
      '/images/group/group9.jpg',
      '/images/group/group10.jpg'
    ],
    colors: {
      primary: '#C2185B',
      secondary: '#F8BBD0',
      background: '#FFF1F7'
    }
  },
  {
    name: 'Martin',
    images: [
      '/images/martin/martin1.jpg',
      '/images/martin/martin2.jpg',
      '/images/martin/martin3.jpg',
      '/images/martin/martin4.jpg',
      '/images/martin/martin5.jpg',
      '/images/martin/martin6.jpg',
      '/images/martin/martin7.jpg',
      '/images/martin/martin8.jpg',
      '/images/martin/martin9.jpg',
      '/images/martin/martin10.jpg'
    ],
    colors: {
      primary: '#FF4D6D',
      secondary: '#FFC2D1',
      background: '#FFF0F3'
    }
  },
  {
    name: 'James',
    images: [
      '/images/james/james1.jpg',
      '/images/james/james2.jpg',
      '/images/james/james3.jpg',
      '/images/james/james4.jpg',
      '/images/james/james5.jpg',
      '/images/james/james6.jpg',
      '/images/james/james7.jpg',
      '/images/james/james8.jpg',
      '/images/james/james9.jpg',
      '/images/james/james10.jpg'
    ],
    colors: {
      primary: '#6A4C93',
      secondary: '#CDB4DB',
      background: '#F3E8FF'
    }
  },
  {
    name: 'Juhoon',
    images: [
      '/images/juhoon/juhoon1.webp',
      '/images/juhoon/juhoon2.webp',
      '/images/juhoon/juhoon3.webp',
      '/images/juhoon/juhoon4.jpeg',
      '/images/juhoon/juhoon5.webp',
      '/images/juhoon/juhoon6.webp',
      '/images/juhoon/juhoon7.webp',
      '/images/juhoon/juhoon8.webp',
      '/images/juhoon/juhoon9.webp',
      '/images/juhoon/juhoon10.webp'
    ],
    colors: {
      primary: '#00B4D8',
      secondary: '#CAF0F8',
      background: '#F0FBFF'
    }
  },
  {
    name: 'Seonghyeon',
    images: [
      '/images/seonghyeon/seonghyeon1.jpg',
      '/images/seonghyeon/seonghyeon2.jpg',
      '/images/seonghyeon/seonghyeon3.jpg',
      '/images/seonghyeon/seonghyeon4.jpg',
      '/images/seonghyeon/seonghyeon5.jpg',
      '/images/seonghyeon/seonghyeon6.jpg',
      '/images/seonghyeon/seonghyeon7.jpg',
      '/images/seonghyeon/seonghyeon8.jpg',
      '/images/seonghyeon/seonghyeon9.jpg',
      '/images/seonghyeon/seonghyeon10.jpg'
    ],
    colors: {
      primary: '#FF9F1C',
      secondary: '#FFE5B4',
      background: '#FFF8E7'
    }
  },
  {
    name: 'Keonho',
    images: [
      '/images/keonho/keonho1.jpg',
      '/images/keonho/keonho2.jpg',
      '/images/keonho/keonho3.jpg',
      '/images/keonho/keonho4.jpg',
      '/images/keonho/keonho5.jpg',
      '/images/keonho/keonho6.jpg',
      '/images/keonho/keonho7.jpg',
      '/images/keonho/keonho8.jpg',
      '/images/keonho/keonho9.jpg',
      '/images/keonho/keonho10.jpg'
    ],
    colors: {
      primary: '#2A9D8F',
      secondary: '#BEE3DB',
      background: '#F0FFFA'
    }
  }
].map((member) => ({
  ...member,
  image: member.images[0]
}));
