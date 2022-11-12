import {useDropzone} from 'react-dropzone'
import React from 'react'
import cls from 'classnames'
// import {arrayBufferToBase64, detectFileExtension, maxFilesGallery} from '@utils/utils'
// import uuid from 'uuid/v4'
// import UploadedImage from '@fragments/UploadedImage'
// import useGalleryCarousel from '@components/GalleryCarousel'
// import {createBase64Str} from '@utils/utils'
// import {useTranslation} from '@ii18n'
// import Loader from '@fragments/svg/Loader'
// import {maxFileSize, imageAcceptedExtensions} from '@utils/utils'
// import _ from 'lodash'


// const defaultAcceptedImagesFormats = imageAcceptedExtensions


// const UploadedImages = ({ values, createDeleteHandler, value, ...props }) => {
//
//     const images = values.map(image => image.src
//         ? image
//         : (image.base64Str
//             ? {...image, src: image.base64Str}
//             : console.error('Image has neither src nor base64')))
//
//     const gallery = useGalleryCarousel(images)
//
//     return (
//         <div
//             className={`row w-100-p justify-content-center`}
//             style={{marginLeft: -8, marginRight: -8}}
//         >
//
//             {images.map((value, index) => (
//                 <div
//                     key={value.id}
//                     className={`col-3 mb-15 col-lg-4 col-md-6 col-sm-12`}
//                     style={{paddingLeft: 8, paddingRight: 8}}
//                 >
//                     <div style={{background: '#000'}}>
//                         <UploadedImage
//                             value={value}
//                             toolbars={true}
//                             onDelete={createDeleteHandler(value)}
//                             {...props}
//                             onClick={() => gallery.setGalleryOpenedImage({image: value, index})}
//                         />
//                     </div>
//                 </div>
//             ))}
//             {gallery.render}
//         </div>
//     )
// }

const Dropzone = (props) => {
    const {
        multiple = false,
        hideIfSelected = true,
        onChange,
        value,
        name,

        notDisplayable = false,
        toolbars,
        renderImage = true,

        RendererUploadedImages,
        customVisual,

        /* view modes enum  */
        rectangular,
        circle,

        validationErrorMessage,
        isValid = null,
        withError = true,
        withSuccess = true,
        // accept = defaultAcceptedImagesFormats,
        /* which icon */
        icon ,// ['photo', 'video', 'file']
        type = 'image'  // or 'video',  value to base 64 data/type
    } = props
    const [loading, setLoading] = React.useState(false)
    const [maxSizeError, setMaxSizeError] = React.useState(false)
    const t = t => t
    const shouldRenderAsSuccess = withSuccess && isValid === true
    const shouldRenderAsError = withError && isValid === false && validationErrorMessage
    const [error, setError] = React.useState('')

    const maxFilesReached = false
    const onDrop = acceptedFiles => {
        maxSizeError && setMaxSizeError(false) // clear error
        error && setError('')

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => alert('file reading has failed')
            reader.onload = async () => {
                const base64Str = window.URL.createObjectURL(file)
                const formData = new FormData()
                formData.append('value', file)

                onChange(
                    formData
                    // multiple
                    //     ? state => ({
                    //         ...state,
                    //         // check if max files reached
                    //         [name]: [...state[name], {...file, base64Str, id: Date.now(), formData }]
                    //     })
                    //     : {...file, base64Str, formData }
                )
                setLoading(false)
            }

            reader.readAsArrayBuffer(file)

        })
    }

    // const acceptFiles = (() => {
    //     if(!accept && type) {
    //         if(_.isString(type)) {
    //             return `${type}/*`
    //         }
    //         else if(_.isArray(type)) {
    //             return type.map(i => `${type}/*`)
    //         }
    //     } else if(accept) {
    //         if(_.isString(accept)) {
    //             return `.${accept}`
    //         }
    //         else if(_.isArray(accept)){
    //             return accept.map(i => `.${i}`)
    //         }
    //     }
    // })();

    /* call dropzone */
    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        onDrop,
        multiple,
        // accept: acceptFiles,
        // maxSize: maxFileSize,
        disabled: maxFilesReached,
        onDropAccepted: function (...params) {
            setLoading(true)
        },
        onDropRejected: function (file) {
            // if(!multiple && file[0].size >= maxFileSize) {
            //     setMaxSizeError(true)
            // }
            // else if(file[0] && acceptFiles && acceptFiles.length && !acceptFiles.includes(detectFileExtension(file[0]))) {
            //     setError(t('errors:unsupported_format'))
            // }
        },
    })

    const hasValue = multiple ? (value.length > 0) : !!value

    const createDeleteHandler = (item) => () => onChange(
        multiple
            ? value.filter(i => i.id !== item.id)
            : null
    )

    // const _RendererUploadedImages =


    const areaHandlerRender = (visible = true) => (
        <div className={cls('dropzone-focus-handler', !visible && 'd-none')} {...getRootProps()}>
            <input {...getInputProps()} id={`${name}Dropzone`} />
            {customVisual ? customVisual() :
                (
                    <>
                        <div
                            title={maxFilesReached ? 'Max files riched' : undefined}
                            className={cls(
                                `dropzone`,
                                rectangular && 'dropzone--rectangular',
                                circle && 'dropzone--circle overflow-hidden',
                                hasValue && 'dropzone--has-value',
                                maxFilesReached ? 'cursor-disabled' : 'pointer',
                                shouldRenderAsSuccess && 'with-success',
                                shouldRenderAsError && 'with-error',
                            )}
                        >
                            {loading && (
                                <div className="fluid-absolute flex flex-center bg-white">
                                    {/*<Loader></Loader>*/}
                                </div>
                            )}
                            <div className={cls(
                                'flex flex-column',
                                circle && 'fluid-absolute flex-center'
                            )}>
                                {hasValue && notDisplayable
                                    ? (
                                        <>
                                            {!multiple && value.path}
                                        </>
                                    )
                                    : (
                                        <>
                      <span className={cls(
                          isDragActive && 'visibility-hidden', // drag handling effect
                          `pl-15 pr-15 text-center light-grey-3 fz-12 fw-500 lh-150`
                      )}>
                        {t('click_to_upload_or_dnd')}
                      </span>
                                            {/* icon, for now video or photo */}
                                            {icon && (
                                                <img
                                                    height={33}
                                                    className={`mt-10`}
                                                    src={`/static/svg/${icon}.svg`}
                                                    alt="icon decorator"
                                                />
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        {maxSizeError && (
                            <div className="validation-error-message pt-5">
                                {t('max_file_size_exceed')}
                            </div>
                        )}
                        {error && (
                            <div className="validation-error-message pt-5">
                                {error}
                            </div>
                        )}
                    </>
                )
            }
        </div>
    )

    return (
        <div>
            {notDisplayable
                ? areaHandlerRender()
                :
                (hasValue && multiple) // render multiple images
                    ? (
                        <div className="">
                            {/*{renderImage && value.length > 0 && (*/}
                            {/*    <_RendererUploadedImages*/}
                            {/*        values={value}*/}
                            {/*        createDeleteHandler={createDeleteHandler}*/}
                            {/*        {...props}*/}
                            {/*    />*/}
                            {/*)}*/}
                            <div className={`mt-20`}>
                                {areaHandlerRender()}
                            </div>
                        </div>
                    )
                    : (
                        hasValue // not multiple
                            ? (
                                <>
                                    {areaHandlerRender(!hideIfSelected)}
                                    {/*{renderImage && (*/}
                                    {/*    <UploadedImage*/}
                                    {/*        onDelete={createDeleteHandler(value)}*/}
                                    {/*        open={open}*/}
                                    {/*        {...props}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                </>
                            )
                            : ( // or placeholder
                                areaHandlerRender()
                            )
                    )
            }

            {validationErrorMessage && (
                <div className={`validation-error-message pt-5`}>
                    {validationErrorMessage}
                </div>
            )}
        </div>
    )
}

const DropzoneWithLabel = ({ label, icon, toolbars = true, ...props }) => {
    return (
        <div>
            <label className="input-label pointer d-block" htmlFor={`${props.name}Dropzone`}>
                {label}
            </label>
            <Dropzone rectangular icon={icon || 'photo'} toolbars={toolbars} {...props} />
        </div>
    )
}

// export const LogoDropzone = props => {
//     const {t} = useTranslation('common')
//
//     return (
//         <Dropzone
//             label={t('logo')}
//             name={'logo'}
//             rectangular
//             icon={'photo'}
//             toolbars={true}
//             {...props}
//         />
//     )
// }

// const CoverDropzone = props => {
//     const {t} = useTranslation('common')
//
//     return (
//         <Dropzone
//             label={t('cover')}
//             name={'cover'}
//             icon={'photo'}
//             toolbars={true}
//             rectangular
//             {...props}
//         />
//     )
// }

// const AddGalleryUploadedImagesRenderer = ({ values, createDeleteHandler, ...props }) => {
//     return (
//         <div className={`row pl-0 pr-0 min-w-555 w-100-p mb-20-minus`}>
//             {values.map(value => (
//                 <div className={`col-3 mb-20 max-w-130`} key={value.id}>
//                     <UploadedImage
//                         value={value}
//                         onDelete={createDeleteHandler(value)}
//                         toolbars={true}
//                         {...props}
//                     />
//                 </div>
//             ))}
//         </div>
//     )
// }
//
// const ImagesDropzone = props => (
//     <Dropzone
//         name={'photos'}
//         icon={'photo'}
//         rectangular
//         multiple={true}
//         heightRate={75 / 125}
//         renderImage={true}
//         // RendererUploadedImages={AddGalleryUploadedImagesRenderer}
//         {...props}
//     />
// )
//
// const ImageFromFolder = props => {
//     const {t} = useTranslation(['space'])
//     return (
//         <div className={`pt-10`}>
//             <DropzoneWithLabel {...props} name={`image`} label={false}/>
//         </div>
//     )
// }

// const ImageFromFolder = props => (
//   <Dropzone
//     hideIfSelected={false}
//     renderImage={false}
//     name={`image`}
//     customVisual={() => (
//       <div className={`pointer`}>
//         <img
//           src="/static/svg/photo-from-folder.svg"
//           alt="click or drag&drop file"
//           title={`click or drag&drop file`}
//         />
//       </div>
//     )}
//     {...props}
//   />
// )

// export const Avatar = props => (
//     <Dropzone
//         name={'avatar'}
//         circle
//         icon={'photo'}
//         toolbars={true}
//         {...props}
//     />
// )



export {
    Dropzone as default,
    // CoverDropzone,
    // ImagesDropzone,
    // ImageFromFolder,
    DropzoneWithLabel,
}