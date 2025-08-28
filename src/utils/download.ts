/**
 * 统一下载保存图片工具函数
 * 兼容H5和微信小程序平台
 */

interface DownloadOptions {
  url: string;
  fileName?: string;
}

/**
 * 下载并保存图片
 * @param options 下载配置
 */
export const downloadAndSaveImage = async (options: DownloadOptions): Promise<boolean> => {
  try {
    // #ifdef H5
    // H5平台使用a标签下载
    return await downloadForH5(options);
    // #endif
    
    // #ifdef MP-WEIXIN
    // 微信小程序平台使用uni.downloadFile和uni.saveImageToPhotosAlbum
    return await downloadForWechatMp(options);
    // #endif
    
    // 默认返回失败
    uni.showToast({
      title: "当前平台不支持下载",
      icon: "none",
    });
    return false;
  } catch (error) {
    console.error("下载失败:", error);
    uni.showToast({
      title: "下载失败",
      icon: "none",
    });
    return false;
  }
};

/**
 * H5平台下载图片
 * @param options 下载配置
 */
const downloadForH5 = async (options: DownloadOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // 创建a标签下载
      const link = document.createElement("a");
      link.href = options.url;
      link.download = options.fileName || "wallpaper.jpg";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      uni.showToast({
        title: "下载成功",
        icon: "success",
      });
      resolve(true);
    } catch (error) {
      console.error("H5下载失败:", error);
      uni.showToast({
        title: "下载失败",
        icon: "none",
      });
      resolve(false);
    }
  });
};

/**
 * 微信小程序平台下载图片
 * @param options 下载配置
 */
const downloadForWechatMp = async (options: DownloadOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    // 检查是否授权相册权限
    uni.authorize({
      scope: "scope.writePhotosAlbum",
      success: () => {
        // 已授权，直接下载
        performDownload(options, resolve);
      },
      fail: () => {
        // 未授权，请求授权
        uni.showModal({
          title: "授权请求",
          content: "需要授权保存图片到相册",
          success: (res) => {
            if (res.confirm) {
              uni.openSetting({
                success: (setting) => {
                  if (setting.authSetting["scope.writePhotosAlbum"]) {
                    // 授权成功，执行下载
                    performDownload(options, resolve);
                  } else {
                    uni.showToast({
                      title: "未授权相册权限",
                      icon: "none",
                    });
                    resolve(false);
                  }
                },
                fail: () => {
                  uni.showToast({
                    title: "授权失败",
                    icon: "none",
                  });
                  resolve(false);
                }
              });
            } else {
              resolve(false);
            }
          }
        });
      }
    });
  });
};

/**
 * 执行下载操作
 * @param options 下载配置
 * @param resolve Promise resolve函数
 */
const performDownload = (options: DownloadOptions, resolve: (value: boolean) => void) => {
  uni.downloadFile({
    url: options.url,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: "保存成功",
              icon: "success",
            });
            resolve(true);
          },
          fail: (saveError) => {
            console.error("保存失败:", saveError);
            uni.showToast({
              title: "保存失败",
              icon: "none",
            });
            resolve(false);
          },
        });
      } else {
        uni.showToast({
          title: "下载失败",
          icon: "none",
        });
        resolve(false);
      }
    },
    fail: (downloadError) => {
      console.error("下载失败:", downloadError);
      uni.showToast({
        title: "下载失败",
        icon: "none",
      });
      resolve(false);
    },
  });
};