import Image from "next/image";

const FiltersCheckbox = ({name, value, onChange}) => {
  return (
    <>
      <input 
      className="checkbox-input" 
      id={name} onChange={() => onChange({type: 'change', name: name})} 
      type="checkbox" 
      checked={value} 
      />
      <label className="checkbox" htmlFor={name}>
        <span>
          
        </span>
        <span className="capitalize">{name}</span>
      </label>
      <style jsx>
        {`
        .checkbox-symbol {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
          user-select: none;
        }

        .checkbox-container {
          box-sizing: border-box;
          background: #ffffff;
          color: #222;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: row wrap;
        }

        .checkbox-container * {
          box-sizing: border-box;
        }

        .checkbox-input {
          position: absolute;
          visibility: hidden;
        }

        .checkbox {
          user-select: none;
          cursor: pointer;
          padding: 6px 8px;
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
        }

        .checkbox:not(:last-child) {
          margin-right: 6px;
        }

        .checkbox:hover {
          background: #E1F0EE;
        }

        .checkbox span {
          vertical-align: middle;
          transform: translate3d(0, 0, 0);
        }

        .checkbox span:first-child {
          position: relative;
          flex: 0 0 18px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          transform: scale(1);
          border: 1px solid #cccfdb;
          transition: all 0.3s ease;
        }

        .checkbox span:first-child svg {
          position: absolute;
          top: 3px;
          left: 2px;
          fill: none;
          stroke: #fff;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transform: translate3d(0, 0, 0);
        }

        .checkbox span:last-child {
          padding-left: 8px;
          line-height: 18px;
        }

        .checkbox:hover span:first-child {
          border-color: #28978A;
        }

        .checkbox-input:checked + .checkbox span:first-child {
          background: #28978A;
          border-color: #28978A;
          animation: zoom-in-out 0.3s ease;
        }

        .checkbox-input:checked + .checkbox span:first-child svg {
          stroke-dashoffset: 0;
        }

        @keyframes zoom-in-out {
          50% {
            transform: scale(0.9);
          }
        }

        `}
      </style>
    </>
  );
}
 
export default FiltersCheckbox;