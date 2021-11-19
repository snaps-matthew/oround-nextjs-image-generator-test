# oround-nextjs-image-generator

## Command
- 개발
```
# next dev
npm run dev
```

## Project Dependency
- Next.js (12.x)
- node-canvas (2.6.1)
```
// package.json (아래 부분 수정하지 말것)
{
  ~
  "install-canvas-dep": "yum install libuuid-devel libmount-devel zlib && cp /lib64/{libuuid,libmount,libblkid,libz}.so.1 node_modules/canvas/build/Release/",
  ~
}
```

## Related Resources
- Github - current
- [Vercel](https://vercel.com/snaps-fe/oround-nextjs-image-generator)

- CDN
  - 운영
    - https://product-image.oround.com <-> https://oround-nextjs-image-generator.vercel.app

##
### Client
TBD:
  - CDN에 캐싱된 리소스 초기화
  - CDN에 이미지 밀어넣기 (전체)

### Server
- pages/api/**
  - 이미지 생성 서버 관련 기능
  - apiResources/**
