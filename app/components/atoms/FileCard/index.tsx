import FileCardProps from "@/app/components/atoms/FileCard/index.types";
import { FC } from "react";

const FileCard: FC<FileCardProps> = ({value}) => {
    return (
        <div className="mt-4 mb-0 mr-4 ml-4 w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden rounded-xl">
            <div className="w-20 h-20 bg-violet-500 rounded-full absolute -right-6 -top-6">
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-3 left-3">
                    <path d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM14 22C14.5523 22 15 21.5523 15 21C15 20.4477 14.5523 20 14 20V22ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM18 10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10H18ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18V16ZM12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16V18ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12V14ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10V8ZM10 10C10.5523 10 11 9.55228 11 9C11 8.44772 10.5523 8 10 8V10ZM17.2299 17.7929C16.8394 18.1834 16.8394 18.8166 17.2299 19.2071C17.6204 19.5976 18.2536 19.5976 18.6441 19.2071L17.2299 17.7929ZM15.0316 15.2507C14.8939 15.7856 15.2159 16.3308 15.7507 16.4684C16.2856 16.6061 16.8308 16.2841 16.9684 15.7493L15.0316 15.2507ZM17.9375 20C17.3852 20 16.9375 20.4477 16.9375 21C16.9375 21.5523 17.3852 22 17.9375 22V20ZM17.9475 22C18.4998 22 18.9475 21.5523 18.9475 21C18.9475 20.4477 18.4998 20 17.9475 20V22ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H14V20H8.2V22ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM20 10V9H18V10H20ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM9 18H12V16H9V18ZM9 14H13V12H9V14ZM9 10H10V8H9V10ZM18.937 16C18.937 16.1732 18.8915 16.3053 18.6175 16.5697C18.4638 16.718 18.2828 16.8653 18.0319 17.074C17.7936 17.2723 17.5141 17.5087 17.2299 17.7929L18.6441 19.2071C18.86 18.9913 19.0805 18.8033 19.3109 18.6116C19.5287 18.4305 19.7852 18.2223 20.0065 18.0087C20.4825 17.5493 20.937 16.9314 20.937 16H18.937ZM17.937 15C18.4893 15 18.937 15.4477 18.937 16H20.937C20.937 14.3431 19.5938 13 17.937 13V15ZM16.9684 15.7493C17.0795 15.3177 17.4724 15 17.937 15V13C16.5377 13 15.3645 13.957 15.0316 15.2507L16.9684 15.7493ZM17.9375 22H17.9475V20H17.9375V22Z" fill="#000000"/>
                </svg>
            </div>
            <h1 className="font-bold text-xl text-zinc-800">File data</h1>
            <p className="text-sm text-zinc-500 leading-5">
                <strong>File name: {value.filename}</strong> <br/>
                Author: {/*value.author.name*/} <br/>
                Description: {value.description} <br/>
            </p>
            <h2 className="font-bold text-xl text-zinc-800">{value.whatIsShown}</h2>
            <p className="text-sm text-zinc-500 leading-5">
                Total trail distance: {value.totalDistance.toFixed(2)} <br/>
                Max Elevation: {value.maxElevation.toFixed(2)} <br/>
                Min Elevation: {value.minElevation.toFixed(2)} <br/>
                Difference in Altitude: {value.diffAltitude.toFixed(2)} <br/>
                Positive Elevation difference: {value.posElevationDiff.toFixed(2)} <br/>
                Negative Elevation difference: {value.negElevationDiff.toFixed(2)} <br/>
            </p>
        </div>
        //let stringHTML = '<h2>File data:</h2>' +
        // '<br>File name: ' + fileName +
        // '<br>Author: ' + author.name +
        // '<br>Description: ' + description +
        // '<h3>' + whatIsShown + '</h3>' +
        // '<br>Total trail distance: ' + (totalDistance ? totalDistance.toFixed(2) : 'Could not read') +
        // '<br>Max Elevation: ' + (maxElevation ? maxElevation.toFixed(2) : 'Could not read') +
        // '<br>Min Elevation: ' + (minElevation ? minElevation.toFixed(2) : 'Could not read') +
        // '<br>Difference in Altitude: ' + ((maxElevation && minElevation) ? (maxElevation - minElevation).toFixed(2) : 'Could not read') +
        // '<br>Positive Elevation difference: ' + (posElevationDiff ? posElevationDiff.toFixed(2) : 'Could not read') +
        // '<br>Negative Elevation difference: ' + (negElevationDiff ? negElevationDiff.toFixed(2) : 'Could not read');
    );
};

export default FileCard;
