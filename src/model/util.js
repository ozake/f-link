import proj4 from 'proj4';

/**
   * convertGeo - UTMK좌표를 WGS84좌표값으로 변환하는 메소드
   *
   * @param  {Array} code UTMK좌표가 담긴 배열을 전달한다.
   * @return {type}      WGS84로 변환된 좌표 배열을 리턴한다
   */
  export function convertGeo(code){
    proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
    let firstProjection = proj4.defs('EPSG:5179')
    let secondProjection = proj4.defs('EPSG:4326')

    let convertRes = proj4(firstProjection,secondProjection,code)

    return convertRes
  }
