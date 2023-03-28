import Babylon from "./img/Babylon"
import react from "./img/React"
import Three from "./img/Three"
import TypeScript from "./img/TypeScript"


export const ProjectsList:{
    id:number,
    name:string,
    urlName:string,
    path:string,
    link:string,
    homepageInfos:{
        position:{
            x:number,
            y:number
        },
        scale:number
    },
    projectInfos:{
        date:string,
        type:string,
        resume:string,
        languages:{
            element:()=>JSX.Element,
            name:string
        }[]
    }
}[]
= 
[
    {
        id:0,
        name:'Wellsup',
        urlName:'wellsup',
        path:'./models/Wellsup.glb',
        link:'https://medium.com/@gregoire.richard86/wellsup-building-a-cloud-based-web-app-to-allow-students-to-find-the-best-education-possible-fdc8dcb9722d',
        homepageInfos:{
            position:{
                x:0,
                y:3
            },
            scale:0.5
        },
        projectInfos:{
            date:'2022',
            type:'Front-end Developer',
            resume:'Application that help french students who are leaving high school to find the college and degree that fit their preferences, fetching the L\'étudiant database.',
            languages:[
                {
                    name:'React',
                    element:react
                }
            ]
        }
    },
    {
        id:1,
        name:'Portfolio V1',
        urlName:'portfolioV1',
        path:'./models/PortfolioV1.glb',
        link:'https://louiscuenotsfirstportolio.netlify.app/',
        homepageInfos:{
            position:{
                x:-5,
                y:1
            },
            scale:0.5
        },
        projectInfos:{
            date:'2020',
            type:'Personnal Project',
            resume:'The first version of my portfolio, that showed the differents projects I\'ve been involved to at this time.',
            languages:[
                {
                    name:'Vue',
                    element:react
                }
            ]
        }
    },
    {
        id:2,
        name:'Sandbox',
        urlName:'sandbox',
        path:'./models/Sandbox.glb',
        link:'https://louiscuenot.com/PrototypagePortfolio/',
        homepageInfos:{
            position:{
                x:-2.5,
                y:-2.5
            },
            scale:0.5
        },
        projectInfos:{
            date:'2021',
            type:'Personnal project',
            resume:'A website that I created during my learning of Three.js; It\'s original purpose was to be my new portfolio, but I realized at this time that integrating 3D into a website challenging.',
            languages:[
                {
                    name:'Three.js',
                    element:Three
                }
            ]
        }
        
    },
    {
        id:3,
        name:'Nfinite Asset Viewer',
        urlName:'nfinite_asset_viewer',
        path:'./models/Nfinite.glb',
        link:'https://www.linkedin.com/company/nfiniteapp/',
        homepageInfos:{
            position:{
                x:2.5,
                y:-2.5
            },
            scale:0.5
        },
        projectInfos:{
            date:'2022',
            type:'3D Developer',
            resume:'An application that I developped during my internship at Nfinite. It is a 3D model Viewer destinated to the 3D operators who have to track and correct issues on the 3D models.',
            languages:[
                {
                    name:'React',
                    element:react
                },
                {
                    name:'Babylon.js',
                    element:Babylon
                },
                {
                    name:'TypeScript',
                    element:TypeScript
                }
            ]
        }
    },
    {
        id:4,
        name:'Mellowdy',
        urlName:'mellowdy',
        path:'./models/Mellowdy.glb',
        link:'https://mellowdy.fr/',
        homepageInfos:{
            position:{
                x:5,
                y:1 
            },
            scale:0.5
        },
        projectInfos:{
            date:'2021',
            type:'Front-End Developer',
            resume:'An application that generate a playlist into your Spotify account depending on an artist you like, a song you like and differents other parameters.',
            languages:[
                {
                    name:'React',
                    element:react
                },
                {
                    name:'TypeScript',
                    element:TypeScript
                }
            ]
        }

    }
    
]

